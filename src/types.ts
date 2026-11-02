export type Nutrition={kcal:number;protein:number;carbs:number;fat:number;fiber:number};
export type Food=Nutrition&{name:string;brand?:string;image?:string;barcode?:string;source?:string;serving?:number;basis?:string;nutriscore?:string};
export type Meal=Nutrition&{id:string;name:string;date:string;meal:string;grams:number;unit?:string;image?:string;source:string;time:string};
export type Profile={name:string;age:number;sex:string;height:number;weight:number;activity:string;goal:string;targetWeight:number};
export type State={profile:Profile|null;goals:Nutrition&{water:number};meals:Meal[];water:Record<string,number>;weights:{date:string;value:number}[];favorites:Food[]};
