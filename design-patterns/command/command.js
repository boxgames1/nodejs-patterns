function createSendStatusCmd(service, status) {
  let postId = null;
  const command = () => {
    postId = service.sendUpdate(status);
  };
  command.undo = () => {
    if (postId) {
      service.destroyUpdate(postId);
      postId = null;
    }
  };
  command.serialize = () => {
    return { type: "status", action: "post", status: status };
  };
  return command;
}

module.exports = createSendStatusCmd;
