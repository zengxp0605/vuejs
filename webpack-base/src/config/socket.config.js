
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIyMDM3NjMxNDQ4IiwiZXhwIjoxNDY0MTU4NTY0fQ.CsIowewEi_ub-A4ZcTKNBROtnpEO8rMQCbBbqqhwph8";
const config = {
    gameId: 39727,
    socketUrl: 'http://192.168.2.2:3000',
    token: token,
}

const interactiveKey = 'interactive';
config.interactiveKey = interactiveKey;

config.cmd = {
    roomList: `${interactiveKey}::roomList`,
    roomInto: `${interactiveKey}::roomInto`,
    test: `${interactiveKey}::test`,
    bet: `${interactiveKey}::bet`,
}

export default config