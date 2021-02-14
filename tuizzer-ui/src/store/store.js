export default {
    state: {
        socket: null,
        playerId: null,
    },
    setPlayerId (newValue) {
        console.debug('setting the id');
        this.state.playerId = newValue;
    },
    setSocket (newValue) {
        console.debug('setting the socket');
        this.state.socket = newValue;
    },
    clearSocket () {
    console.debug('clearing the socket');
        this.state.socket = null;
    }
}
