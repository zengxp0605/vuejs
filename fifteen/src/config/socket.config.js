
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIyMDM3NjMxNDQ4IiwiZXhwIjoxNDY0MTU4NTY0fQ.CsIowewEi_ub-A4ZcTKNBROtnpEO8rMQCbBbqqhwph8";
const config = {
    gameId: 39727,
    socketUrl: 'http://192.168.2.2:3000',
    token: token,
}

const interactiveKey = 'interactive';

export const EMIT_FLAG = 'socketEmit';

export const cmd = {
    error: `${interactiveKey}::error`,
    roomList: `${interactiveKey}::roomList`,
    checkGameStatus: `${interactiveKey}::checkGameStatus`,
    roomInto: `${interactiveKey}::roomInto`,
    quickInto: `${interactiveKey}::quickInto`,
    test: `${interactiveKey}::test`,
    bet: `${interactiveKey}::bet`,
    gameOver: `${interactiveKey}::gameOver`,
    play: `${interactiveKey}::play`,
    chargeMoney: `${interactiveKey}::chargeMoney`,
    roomShow: `${interactiveKey}::roomShow`,
    gameStart: `${interactiveKey}::gameStart`,
    countDown: `${interactiveKey}::countDown`,
    roomLeave: `${interactiveKey}::roomLeave`,
    quickInto: `${interactiveKey}::quickInto`,
}

config.cmd = cmd;
config.EMIT_FLAG = EMIT_FLAG;

export default config