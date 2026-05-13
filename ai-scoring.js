function calculateAIScore(product){
  let score=0;

  if(product.market==='프리미엄') score+=40;
  if(product.category==='사료') score+=20;
  if(product.taiwanPotential==='높음') score+=40;

  return score;
}

const sample={
 market:'프리미엄',
 category:'사료',
 taiwanPotential:'높음'
}

console.log('AI Score:',calculateAIScore(sample));