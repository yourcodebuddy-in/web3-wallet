import "next";

declare global {
  namespace NodeJS {
    interface ProcessEnv {}
  }
}
