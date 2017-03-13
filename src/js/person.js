/**
 * Created by wty on 2017/2/15.
 * ES6类的写法
 *
 */
 class person{
     constructor ({name="亚当",age="25",adr="地球",sex="男"}){
         Object.assign(this,{name,age,adr,sex});//参数合并
     }

    _say(){
         alert(`我叫${this.name}，来自${this.adr}`)
    }
    _walk(w="walk"){
        alert(`${this.name} can ${w}`)
    }


}

//export default person
module.exports=person
