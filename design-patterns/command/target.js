const statusUpdateService = {
  statusUpdates: {},
  sendUpdate: function(status) {
    console.log("Status sent: " + status);
    let id = Math.floor(Math.random() * 1000000);
    statusUpdateService.statusUpdates[id] = status;
    return id;
  },
  destroyUpdate: id => {
    console.log("Status removed: " + id);
    delete statusUpdateService.statusUpdates[id];
  }
};

module.exports = statusUpdateService;
