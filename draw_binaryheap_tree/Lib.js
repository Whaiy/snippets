function drawHeap(arr,w,h,r,x,y){
    r=16, w=550, h=200, x=25, y=250;
    let heapTree=``;
    let n=arr.length;
    let floor=Math.floor(Math.log2(n))+1;
    let nmn= 2**(floor-1);
    let nmx= 2**floor-1;
    let rowGap=w/(nmx-nmn);
    let maxstartcx= x + rowGap * (nmx-nmn);
    let cx= x + rowGap * (n-nmn);
    let cy= y;
    let columnGap = h/(floor-1);
    let startcx=cx.toFixed(2),startcy=cy.toFixed(2),endcx=(cx+rowGap/2).toFixed(2),endcy=cy-columnGap;
    // stringify
    for(let i=arr.length-1; i>-1; i--){
        if (i+2 == nmn){
            floor--;
            nmn=2**(floor-1);
            cx=maxstartcx=maxstartcx-rowGap/2;
            cy=cy-columnGap;
            rowGap+=rowGap;
        };
        cx=parseFloat(cx.toFixed(2));cy=parseFloat(cy.toFixed(2));
        heapTree = `
            <circle cx="${cx}" cy="${cy}" r="${r}"/>
            <text x="${cx}" y="${cy}">${arr[i]}</text>
        ` + heapTree;
        if(i+i+2==n){
            heapTree=`
                <path d="M${startcx} ${startcy}L${endcx} ${endcy}"/>
            ` + heapTree;
        }
        if (i+i+2<n){
            let leaf_lx,leaf_ly,leaf_rx;
            leaf_rx=cx-rowGap/2/2;
            leaf_lx=cx+rowGap/2/2; leaf_ly=cy+columnGap;
            leaf_lx=parseFloat(leaf_lx.toFixed(2));leaf_rx=parseFloat(leaf_rx.toFixed(2));leaf_ly=parseFloat(leaf_ly.toFixed(2));
            heapTree = `
                <path d="M${cx} ${cy}L${leaf_lx} ${leaf_ly}ZL${leaf_rx} ${leaf_ly}"/>
            ` +
            heapTree;
        };
        cx-=rowGap;
    };
    // instantiate
    document.querySelector(".heapTree").innerHTML=heapTree.trim();
}