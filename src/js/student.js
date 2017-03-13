
import person from './person.js';
class student extends person{
    constructor(args){
        super(args);
        Object.assign(this,args);//参数合并

    }
    _grade(){
        alert(`我是${this.name}，我在上${this.grade}`);
    }
    //重写_walk
    _walk(){
        alert(`我是${this.name}，我能跑得快`)
    }
}

//export default student;
module.exports=student