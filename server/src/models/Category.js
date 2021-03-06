import mongoose from 'mongoose';
import moment from 'moment';
const ObjectId = mongoose.Schema.Types.ObjectId;

//=== SUB-DOCUMENTS ===//
const ChangeTrackerSchema = new mongoose.Schema({
  // this will be a moment date.
  createdAt: Date,
  reasonForChange: { type: String, enum: ['add', 'purchase', 'death', 'theft', 'sale', 'other'] },
  animalsMoved: Number,
  notes: String
});

//=== DOCUMENTS ===//
const CategorySchema = new mongoose.Schema({
  name: String,
  farmer_id: { type: ObjectId, ref: 'User' },
  category: {
    type: String,
    enum: [
      'archive',
      'oxen',
      'cows',
      'bull-calves',
      'weaners',
      'bulls',
      'pasturelot',
      'feedlot',
      'grassland',
      'replacement-heifers'
    ]
  },
  currentMonthDetail: {
    openingTotal: { type: Number, default: 0 },
    closingTotal: Number,
    period: { type: String, default: moment().format('MMM-YYYY') },
    changes: {
      add: { type: Number, default: 0 },
      purchase: { type: Number, default: 0 },
      death: { type: Number, default: 0 },
      theft: { type: Number, default: 0 },
      sale: { type: Number, default: 0 },
      other: { type: Number, default: 0 }
    }
  },
  monthlyDetailArchive: { type: Object, default: {} },
  currentMonthChanges: [ChangeTrackerSchema],
  changesArchive: { type: Object, default: {} },
  changes: [ChangeTrackerSchema]
});

// make sure the virtuals get added
CategorySchema.set('toObject', { virtuals: true });
CategorySchema.set('toJSON', { virtuals: true });

//--- HOOKS ---//
/**
 *  ARCHIVING EACH MONTH AND PRODUCING A SUMMARY CHANGE OBJECT
 *
 *  Before each save (every update/create or patch )
 *    Check the detail summary is for the current month.
 *    If not then archive it into monthlyDetailArchive
 *    If month has not changed then recalculate the closing total and update the changes sumamry object
 *
 *  IDEA: this pre save could be run for month, week, day etc
 *
 *  EDGE: if a change is set retrospectively and the month has already changed
 *        then this will create problems with the current set up.
 *        A more robust solution would be to create change summary from the monthly detail archive??
 */

CategorySchema.pre('save', function(next) {
  // at first save of a new month, archive last month, set the period and the openingTotal
  const period = moment().format('MMM-YYYY');
  let currentMonthUpdate = null;

  if (this.currentMonthDetail.period !== period) {
    // archives the current month at first save of a new month
    const lastMonth = JSON.parse(JSON.stringify(this.currentMonthDetail));
    this.monthlyDetailArchive[lastMonth.period] = lastMonth;

    currentMonthUpdate = startNewMonth(lastMonth.closingTotal, period);
  } else {
    currentMonthUpdate = this.currentMonthDetail;
  }

  // updates the closing total and the change summary object
  currentMonthUpdate.closingTotal = getClosingTotal(
    this.currentMonthChanges,
    currentMonthUpdate.openingTotal
  );
  currentMonthUpdate.changes = aggregateMonthChanges(this.currentMonthChanges);

  this.currentMonthDetail = currentMonthUpdate;
  next();
});

//--- VIRTUALS ---//

CategorySchema.virtual('id').get(function() {
  const stringId = JSON.stringify(this._id);
  return JSON.parse(stringId);
});

//--- METHODS ---//

CategorySchema.methods.newChange = function(changeObj) {
  // on adding a new change, check it is for the current month,
  //  --> if it is then add it to current month array
  //  --> if its not then archive the current month array into an object with a key of MMM-YYYY

  const lastMonth = moment()
    .subtract(1, 'month')
    .format('MMM-YYYY');

  if (moment(changeObj.createdAt).format('MMM-YYYY') !== lastMonth) {
    console.log('running successfully!');
    this.changesArchive[lastMonth] = [...this.currentMonthChanges];

    this.currentMonthChanges = [];
    this.currentMonthChanges.push(changeObj);
    return this.save();
  }

  this.currentMonthChanges.push(changeObj);
  return this.save();
};

module.exports = mongoose.model('Category', CategorySchema);

//=== INTERNAL FUNCTION ===//
function startNewMonth(lastMonthClosing, period) {
  const newMonth = {};

  // sets the period of the new month and passes on the closing total of last month
  newMonth.period = period;
  newMonth.openingTotal = lastMonthClosing;

  return newMonth;
}

// creates the summary object for the months changes
function aggregateMonthChanges(changes) {
  const updatedChanges = {
    add: 0,
    death: 0,
    theft: 0,
    sale: 0
  };

  // accumulate the different changes for the month
  changes.forEach(change => {
    if (!updatedChanges[change.reasonForChange]) {
      updatedChanges[change.reasonForChange] = change.animalsMoved;
    } else {
      updatedChanges[change.reasonForChange] += change.animalsMoved;
    }
  });

  return updatedChanges;
}

// calculates the closing total
function getClosingTotal(monthsChanges, openingTotal) {
  let closingTotal = openingTotal;

  for (let i = 0; i < monthsChanges.length; i++) {
    closingTotal += monthsChanges[i].animalsMoved;
  }
  return closingTotal;
}
