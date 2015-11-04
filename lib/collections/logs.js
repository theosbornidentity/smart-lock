Logs = new Mongo.Collection('logs');

Logs.attachSchema(new SimpleSchema({
  user: {
    type: String,
    label: "User"
  },
  date: {
    type: Date,
    label: "Date"
  },
  action: {
    type: String,
    label: "Action"
  }
}));
