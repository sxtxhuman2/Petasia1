async function saveSupplier(data){
  try{
    await db.collection('suppliers').add(data)
    console.log('Saved')
  }catch(e){
    console.error(e)
  }
}

saveSupplier({
  brand:'KPet Premium',
  category:'사료',
  score:95
})