async function crawlProducts(){
  const mockSuppliers=[];

  for(let i=1;i<=100;i++){
    mockSuppliers.push({
      id:i,
      brand:`KPet Supplier ${i}`,
      category:['사료','간식','위생용품','자동급식기'][i%4],
      market:['프리미엄','중가','저가'][i%3],
      score:Math.floor(Math.random()*100),
      taiwanPotential:['높음','중간','낮음'][i%3]
    })
  }

  console.log(mockSuppliers)
}

crawlProducts();