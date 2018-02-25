class Transformer{
  mutate(fn){
    fn(this)
    return this
  }
}

export default Transformer
