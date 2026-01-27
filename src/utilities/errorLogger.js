export default class ErrorLogger {
  constructor(uiMessage, devMessage = null, meta = {}) {
    this.uiMessage = uiMessage;
    this.devMessage = devMessage ?? uiMessage;
    this.meta = meta;
    this.error = new Error(this.devMessage);
    this.error.meta = meta;
  }

  log() {
    console.error(this.error);
    // send to remote logging if configured
    // Remote logging means sending error information outside the user’s
    // browser to a service or server where developers can see it later.
  }

  notify(setError) {
    if (typeof setError === "function") setError(this.uiMessage);
  }

  throw() {
    throw this.error;
  }
}
