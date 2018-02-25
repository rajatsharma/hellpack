const path = require('path')

const attachConfig = (envs) => {
  require('@hellpack/globals')

  if (process.env.NODE_ENV === 'development') {
    global.config = path => (path ? require(path.resolve(process.cwd(), envs.development || envs.dev))[path] :
      require(path.resolve(process.cwd(), envs.development || envs.dev)))
    return
  }

  if (process.env.NODE_ENV === 'production') {
    global.config = path => (path ? require(path.resolve(process.cwd(), envs.production || envs.prod))[path] :
      require(path.resolve(process.cwd(), envs.production || envs.prod)))
    return
  }

  global.config = path => (path ? require(path.resolve(process.cwd(), envs[process.env.NODE_ENV]))[path] :
      require(path.resolve(process.cwd(), envs[process.env.NODE_ENV])))
}
