Status = new Mongo.Collection('status');

Status.attachSchema(new SimpleSchema({
  status: {
    type: String,
    label: "Status"
  },
  date: {
    type: Date,
    label: "Date"
  }
}));
