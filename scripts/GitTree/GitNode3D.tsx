
export class GitNode3D{

    name:string
    parent:GitNode3D | null;
    children:GitNode3D[];

    center:{
        x:number;
        y:number;
        z:number;
    }
    size:number;

    constructor(name:string, parent:GitNode3D | null,center,size:number){
        this.name=name;
        this.parent=parent;
        this.children=[]
        this.center=center;
        this.size=size;

        if (parent) {
            parent.children.push(this);
        }
    }

}
