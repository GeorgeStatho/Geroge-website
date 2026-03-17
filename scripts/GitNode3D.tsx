
export class GitNode3D{

    parent:GitNode3D | null;
    children:GitNode3D[];

    center:{
        x:number;
        y:number;
        z:number;
    }
    size:number;

    constructor(parent:GitNode3D | null,center,size:number){
        this.parent=parent;
        this.children=[]
        this.center=center;
        this.size=size;

        if (parent) {
            parent.children.push(this);
        }
    }

}
