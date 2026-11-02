import type {State,Food} from './types';
export const today=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
export const shiftDate=(date:string,days:number)=>{const d=new Date(date+'T12:00:00');d.setDate(d.getDate()+days);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
export const images={bowl:'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=700&q=85',oats:'https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=300&q=80',salad:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80',avocado:'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=300&q=80'};
export const emptyState=():State=>({profile:null,goals:{kcal:2200,protein:140,carbs:260,fat:67,fiber:30,water:2500},meals:[],water:{},weights:[],favorites:[]});
export const foods:Food[]=[
{name:'Skyr, natur',brand:'Generic · check your package',kcal:63,protein:11,carbs:4,fat:.2,fiber:0},
{name:'Haferflocken',brand:'Rolled oats',kcal:372,protein:13.5,carbs:58.7,fat:7,fiber:10,image:images.oats},
{name:'Magerquark',brand:'Low-fat quark',kcal:67,protein:12,carbs:4,fat:.2,fiber:0},
{name:'Banane',brand:'Banana · peeled',kcal:89,protein:1.1,carbs:22.8,fat:.3,fiber:2.6},
{name:'Vollkornbrot',brand:'Wholegrain bread',kcal:230,protein:8.5,carbs:40,fat:3.5,fiber:7},
{name:'Hähnchenbrust, gegart',brand:'Cooked chicken breast',kcal:165,protein:31,carbs:0,fat:3.6,fiber:0},
{name:'Reis, gekocht',brand:'Cooked rice',kcal:130,protein:2.7,carbs:28,fat:.3,fiber:.4},
{name:'Ei, gekocht',brand:'Boiled egg',kcal:155,protein:13,carbs:1.1,fat:11,fiber:0},
{name:'Tofu, natur',brand:'Plain tofu',kcal:144,protein:17,carbs:3,fat:8,fiber:2},
{name:'Apfel',brand:'Apple',kcal:52,protein:.3,carbs:14,fat:.2,fiber:2.4},
{name:'Lachs, gegart',brand:'Cooked salmon',kcal:206,protein:22,carbs:0,fat:12,fiber:0},
{name:'Olivenöl',brand:'Olive oil',kcal:884,protein:0,carbs:0,fat:100,fiber:0}
].map(f=>({...f,source:'Generic food estimate',basis:'g'}));
export function demoState():State{const d=today();return {...emptyState(),goals:{kcal:2200,protein:140,carbs:260,fat:67,fiber:30,water:2500},water:{[d]:1250},meals:[{id:'demo1',name:'Blueberry overnight oats',date:d,meal:'Breakfast',grams:280,kcal:385,protein:24,carbs:52,fat:9,fiber:7,image:images.oats,source:'Sample meal',time:'08:30'},{id:'demo2',name:'The everyday nourish bowl',date:d,meal:'Lunch',grams:420,kcal:560,protein:38,carbs:62,fat:18,fiber:9,image:images.salad,source:'Sample meal',time:'12:45'},{id:'demo3',name:'Avocado toast & eggs',date:d,meal:'Snack',grams:180,kcal:340,protein:19,carbs:28,fat:17,fiber:5,image:images.avocado,source:'Sample meal',time:'15:10'}],weights:Array.from({length:8},(_,i)=>({date:shiftDate(d,-(7-i)*4),value:[75.8,75.5,75.6,75.2,75.3,74.9,74.8,74.6][i]}))};}
