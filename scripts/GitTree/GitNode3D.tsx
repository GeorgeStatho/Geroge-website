
export class GitNode3D{

    name:string
    parent:GitNode3D | null;
    children:GitNode3D[];
    timeCreated:number;
    constructor(name:string, parent:GitNode3D | null,){
        this.name=name;
        this.parent=parent;
        this.children=[]
        this.timeCreated=0;
        if (parent) {
            parent.children.push(this);
        }
    }

}
