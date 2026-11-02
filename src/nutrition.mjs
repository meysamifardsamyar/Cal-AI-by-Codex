export const sumMeals=(meals)=>meals.reduce((a,m)=>({kcal:a.kcal+m.kcal,protein:a.protein+m.protein,carbs:a.carbs+m.carbs,fat:a.fat+m.fat,fiber:a.fiber+(m.fiber||0)}),{kcal:0,protein:0,carbs:0,fat:0,fiber:0});
export const scaleNutrition=(food,grams)=>Object.fromEntries(['kcal','protein','carbs','fat','fiber'].map(k=>[k,Math.round((food[k]||0)*grams/100*10)/10]));
export function calculateGoals(p){
  const bmr=10*p.weight+6.25*p.height-5*p.age+(p.sex==='male'?5:p.sex==='female'?-161:-78);
  const maintenance=bmr*Number(p.activity);
  const kcal=Math.max(1500,Math.round((maintenance+(p.goal==='lose'?-300:p.goal==='gain'?250:0))/10)*10);
  const protein=Math.round(p.weight*(p.goal==='gain'?1.8:1.6));
  const fat=Math.round(kcal*0.28/9);
  const carbs=Math.max(0,Math.round((kcal-protein*4-fat*9)/4));
  return {kcal:Math.max(1500,kcal),protein,carbs,fat,fiber:30,water:2500};
}
export function normalizeProduct(p){
 const n=p.nutriments||{};
 const kcal=n['energy-kcal_100g']??(Number.isFinite(n.energy_100g)?n.energy_100g/4.184:null);
 const fields=[kcal,n.proteins_100g,n.carbohydrates_100g,n.fat_100g];
 if(fields.some(v=>!Number.isFinite(v)||v<0))return null;
 return {name:p.product_name_de||p.product_name||p.generic_name_de||'Unnamed product',brand:p.brands||'',kcal:Math.round(kcal),protein:n.proteins_100g,carbs:n.carbohydrates_100g,fat:n.fat_100g,fiber:n.fiber_100g||0,image:p.image_front_small_url||'',barcode:p.code||'',serving:p.serving_quantity||100,nutriscore:p.nutriscore_grade||'',source:'Open Food Facts',basis:p.product_quantity_unit==='ml'||/100\s?ml/i.test(p.nutrition_data_per||'')?'ml':'g'};
}
