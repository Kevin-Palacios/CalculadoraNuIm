//q:)->-</:
var copiaMatriz;

function crear(){
    /*
    var index
    var index2
    var con=0;
    var arreglo =[[]];
    /*
    arreglo[0].push("Hola");
    arreglo.push("Pos 2");*/
    /*
    for(index=0; index<8; index++){
        arreglo[index]=[]
        for(index2=0; index2<10; index2++){
            arreglo[index][index2]=con;
            con++;
        }
    }

    for(index=0; index<arreglo.length; index++){
        for(index2=0; index2<arreglo[index].length; index2++){
            console.log(arreglo[index][index2]);
        }
    }
    
    var arreglo2 = new Array();
    /*
    arreglo2[0]="Arreglo2";
    console.log(arreglo2[0]);*/
    /*
    con=0;
    for(index=0; index<10; index++){
        arreglo2[index]=new Array();
        for(index2=0; index2<14; index2++){
            arreglo2[index][index2]=con;
            con++;
        }
    }
    
    for(index=0; index<arreglo2.length; index++){
        for(index2=0; index2<arreglo2[index].length; index2++){
            console.log(arreglo2[index][index2]);
        }
    }

    var i=1
    console.log( String.fromCharCode((65+i)));
    */
    document.getElementById("Tables").innerHTML = "";
    
    var i, j;

    var filas=0;
    var columnas=0;
    

    filas=document.getElementById("filas").value;
    columnas=document.getElementById("columnas").value;
    var n_col=1+parseInt(columnas, 10);
    var n_j=0;

    var HTML = "<table border=0 width=80%>";

    


    for(i=0; i<filas; i++){
        
        HTML += "<tr>";
        for(j=0;j<columnas;j++){
            HTML += "<td align=center>"+'<input type="text" id="x'+i+'_'+j+'" onkeypress="return valideKey(event, this);" style="width: 80px;" > </td>';
        }
    
    }
    


    HTML += "</table>";
    HTML += '<input id="btnCalcular" type="button" value="Aceptar" onclick="calcular()" ></input>'
    document.getElementById("Tables").innerHTML = HTML;

}

function calcular(){
    document.getElementById("Resultados").innerHTML = "";
    document.getElementById("Resultados").innerHTML = "";
    document.getElementById("Resultados2").innerHTML = "";
    document.getElementById("Resultados3").innerHTML = "";
    document.getElementById("combinacionLineal").innerHTML = "";
    document.getElementById("Imprimir").innerHTML = "";
    document.getElementById("BaseNu").innerHTML = "";
    document.getElementById("BaseIm").innerHTML = "";

    var filas=0;
    var columnas=0;
    var solucion=0;

    

    filas=document.getElementById("filas").value;
    columnas=document.getElementById("columnas").value;
    var n_col=1+parseInt(columnas, 10);

    var contador=0;
    var contador0=0;
    var contador02=0;
    
    /******************* */
    for(i=0; i<filas; i++){
        for(j=0;j<columnas;j++){

            if(j!=columnas){
                if(document.getElementById("x"+i+"_"+j).value=="" || document.getElementById("x"+i+"_"+j).value=="-"){
                    contador++;
                }else if(document.getElementById("x"+i+"_"+j).value==0){
                    contador0++;
                }
                
            }else{
                if(document.getElementById("x"+i).value=="" || document.getElementById("x"+i).value=="-"){
                    contador++;
                }else if(document.getElementById("x"+i).value==0){
                    contador0++;
                }
                //matriz[i][j] = 'x';
            }

            
        }

    }

    for (j = 0;  j< columnas; j++) {
        for (i = 0; i < filas; i++) {
            if(document.getElementById("x"+i+"_"+j).value==0){
                contador02++;
            }
            
        }
        
    }
    if(contador>0||contador0==filas*columnas){
        alert("rellena todas las ecuaciones con numeros");
        return false;
    }

    //********************** */


    var matriz= new Array(filas);
    copiaMatriz=new Array(filas);

    var i, j;

    for(i=0; i<filas; i++){
        matriz[i]= new Array(n_col);
        copiaMatriz[i]= new Array(n_col);
        for(j=0; j<n_col;j++){
            if(j!=columnas){
                matriz[i][j] = document.getElementById('x'+i+'_'+j+'').value;
                copiaMatriz[i][j] = document.getElementById('x'+i+'_'+j+'').value;
                
            }else{
                matriz[i][j] = 0;
                copiaMatriz[i][j] = 0;
                //matriz[i][j] = 'x';
            }
            
        }
    }


    var HTML = "<table border=0 width=80%>";

    for(i=0; i<matriz.length; i++){
        
        HTML += "<tr>";
        for(j=0;j<n_col;j++){
            
            HTML += '<td align=center>'+matriz[i][j]+'</td>';
            
            
        }
    
    }
    
    HTML += "</tr></table>";
    
    document.getElementById("Resultados").innerHTML = HTML;

    
    var pivote;
    var auxH;
    var newH="";

    for(i=0; i<matriz.length; i++){

        for(j=0; j<matriz[i].length;j++){

            if(!eliminarFilas(matriz, n_col)){
                document.getElementById("Resultados3").innerHTML = "No tiene solución";
                document.getElementById("combinacionLineal").innerHTML = "&there4;No es una combinación lineal";
                solucion=1;

                break;

            }
            
            if(matriz[i][j]==0 && i==j && j!=columnas){

                
                if(ordenar(matriz, i, j, n_col)==false){
                    document.getElementById("Resultados3").innerHTML = "No tiene solución";
                    document.getElementById("combinacionLineal").innerHTML = "&there4;No es una combinación lineal";
                    //console.log("No tiene solución");
                    solucion=1;
    
                    break;
    
                }else if(ordenar(matriz, i, j, n_col)==true){
                    console.log("sol inf");
                    for(auxH=(j+1); auxH<matriz[i].length-1; auxH++){
                        if(matriz[i][auxH]!=0){
                            pivote=matriz[i][auxH];
                            operacion(matriz, i, j, n_col, pivote, auxH);
                            console.log("Holasss");
                            newH=auxH;
                            auxH=n_col-1;
                        }
                        
                        
                    }
                }else{
                    pivote=matriz[i][j];
                    operacion(matriz, i, j, n_col, pivote);
                }
                //ordenar(matriz, i, j, n_col);
                
                

    
            }else if(matriz[i][j]!=0 && i==j && j!=columnas){
                
                pivote=matriz[i][j];
                operacion(matriz, i, j, n_col, pivote);

            }
            
        }
        
    }

    if(solucion==0){
        for(i=matriz.length-1; i>0; i--){

            for(j=matriz[i].length-1; j>0;j--){
                //console.log("AAs");
                if( i==j && j!=columnas){
                    //console.log("DFVC");
                    pivote=matriz[i][j];
                    operacionAtras(matriz, i, j, n_col, pivote);
    
                }
                
            }
            
        }
        
        imprimirResultados(matriz, n_col);
    }
    
    


}

function operacion(matriz, i, j, n_col, pivote, auxH){

    var mensaje;
    var n_pivote, pivoteaux;
    var k;
    var posicion = parseInt(i, 10)+1;
    var posicion2;
    var dato;
    var expresionultimaFila="";
    var expAux;
    var verificar;

    pivoteaux=pivote;

    if(matriz[i][j]==pivote){
        verificar=true;
    }else{
        verificar=false;
    }

    //if(matriz[i][j]!=0){
        for(k=0;k<matriz[i].length; k++){
            matriz[i][k]=parseFloat(matriz[i][k])/parseFloat(pivote);
            
        }
        

        dato = math.format(math.fraction(pivote), { fraction: 'ratio' });
        if(pivote%1==0){
            mensaje="(1/"+pivote+")(F<sub>"+posicion+"</sub>)→F<sub>"+posicion+"</sub>";
        }else{
            mensaje="(1/("+dato+"))(F<sub>"+posicion+"</sub>)→F<sub>"+posicion+"</sub>";
        }

        
        /*
        if(pivote%1==0 || pivote%.1==0 || pivote%.01==0 || pivote%.001==0|| pivote%.0001==0){
            mensaje="(1/"+pivote+")(F<sub>"+posicion+"</sub>)→F<sub>"+posicion+"</sub>";
        }else{
            mensaje="(1/"+parseFloat(pivote).toFixed(2)+")(F<sub>"+posicion+"</sub>)→F<sub>"+posicion+"</sub>";
        }
        */

        
        imprimir(matriz, mensaje);
    //}
    

    var m;
    var fx;
    
    var expresion_f, expresion_c;

    for(m=i+1; m<matriz.length; m++){
        if(verificar){
            n_pivote=matriz[m][j];
        }else{
            n_pivote=matriz[m][auxH];
        }
        for(k=0; k<matriz[i].length; k++){
            matriz[m][k]=parseFloat(matriz[m][k])-(parseFloat(matriz[i][k])*parseFloat(n_pivote));
        }
        posicion2 = parseInt(m, 10)+1;
        dato = math.format(math.fraction(n_pivote), { fraction: 'ratio' });
        if(n_pivote%1==0){
            mensaje="F<sub>"+posicion2+"</sub>-("+n_pivote+")(F<sub>"+posicion+"</sub>)→F<sub>"+posicion2+"</sub>";
        }else{
            mensaje="F<sub>"+posicion2+"</sub>-("+dato+")(F<sub>"+posicion+"</sub>)→F<sub>"+posicion2+"</sub>";
        }
        /*
        if(n_pivote%1==0 || n_pivote%.1==0 || n_pivote%.01==0 || n_pivote%.001==0|| n_pivote%.0001==0){
            mensaje="F<sub>"+posicion2+"</sub>-("+n_pivote+")(F<sub>"+posicion+"</sub>)→F<sub>"+posicion2+"</sub>";
        }else{
            mensaje="F<sub>"+posicion2+"</sub>-("+parseFloat(n_pivote).toFixed(4)+")(F<sub>"+posicion+"</sub>)→F<sub>"+posicion2+"</sub>";
        }*/
        
        imprimir(matriz, mensaje);
        
    }

    eliminarFilas(matriz, n_col);

    return matriz;
    

}


function ordenar(matriz, i, j, n_col){

    var k, r, m, h, nv;
    var array_columnas= [];
    var auxiliar = [];
    var num_fila="";
    var mensaje;
    var posicion = parseInt(i, 10)+1;
    var posicion2;
    var verificar= true;

    for(k=0;k<matriz.length; k++){
        array_columnas[k]=matriz[k][i]
    }

    for(m=j; m<matriz.length; m++){
        if(array_columnas[m]!=0){
            num_fila=m;
            break;
        }
    }

    //for(nv=0; nv<matriz.length; nv++){
        for(h=(j+1); h<matriz[i].length-1; h++){
            if(matriz[i][h]==0){
                verificar=false;
            }else{
                verificar=true;
                break;
            }
            
            
        }
    //}
    

    if(num_fila!=""){
        for(r=0; r<matriz[i].length; r++){
            auxiliar[r]=matriz[i][r];
            matriz[i][r] = matriz[num_fila][r];
            matriz[num_fila][r] = auxiliar[r];
        }
        posicion2 = parseInt(num_fila, 10)+1;
        mensaje="F<sub>"+posicion+"</sub>↔F<sub>"+posicion2+"</sub>";
        imprimir(matriz, mensaje);
        return matriz;
    }else if(num_fila=="" && !verificar){
        //mensaje="F<sub>"+posicion+"</sub>↔F<sub>"+posicion2+"</sub>";
        //imprimir(matriz, mensaje);
        //console.log("hlola");
        return false;
    }else if(num_fila=="" && verificar){
        return true;
    }


    

    //return matriz;

}



function operacionAtras(matriz, i, j, n_col, pivote){

    var n_pivote;
    var k;
    var mensaje;
    var m=i-1;
    var posicion = parseInt(i, 10)+1;
    var posicion2;
    var dato;
    var expresionultimaFila="";
    var expAux="";
    var auxH, newH;
    var verificar=true;

    var posiciones;
    
    var fx;
    
    var expresion_f, expresion_c;
    if(matriz[i][j]==0){
        for(auxH=(j+1); auxH<matriz[i].length-1; auxH++){
            if(matriz[i][auxH]!=0){
                //pivote=matriz[i][auxH];
                verificar=false;
                console.log(matriz[i].length);
                newH=auxH;
                //auxH=(matriz[i].length-1);
                break;
                
            }else{
                verificar=true;
            }
        }   
    }
    
    
    for(m=i-1; m>=0; m--){
        if(verificar){
            n_pivote=matriz[m][j];
        }else{
            n_pivote=matriz[m][newH];
        }
        console.log(newH);
        for(k=0; k<matriz[i].length; k++){
            
            matriz[m][k]=parseFloat(matriz[m][k])-(parseFloat(matriz[i][k])*parseFloat(n_pivote));
            
        }

        posicion2 = parseInt(m, 10)+1;
        
        dato = math.format(math.fraction(n_pivote), { fraction: 'ratio' });
        if(n_pivote%1==0){
            
            mensaje="F<sub>"+posicion2+"</sub>-("+n_pivote+")(F<sub>"+posicion+"</sub>)→F<sub>"+posicion2+"</sub>";
        }else{
            mensaje="F<sub>"+posicion2+"</sub>-("+dato+")(F<sub>"+posicion+"</sub>)→F<sub>"+posicion2+"</sub>";
        }
        /*
        if(n_pivote%1==0 || n_pivote%.1==0 || n_pivote%.01==0 || n_pivote%.001==0|| n_pivote%.0001==0){
            mensaje="F<sub>"+posicion2+"</sub>-("+n_pivote+")(F<sub>"+posicion+"</sub>)→F<sub>"+posicion2+"</sub>";
        }else{
            mensaje="F<sub>"+posicion2+"</sub>-("+parseFloat(n_pivote).toFixed(4)+")(F<sub>"+posicion+"</sub>)→F<sub>"+posicion2+"</sub>";
        }
        */
        
        imprimir(matriz, mensaje);
    }

   

    return matriz;


}

function eliminarFilas(matriz, n_col,){

    var i, j;
    var contador;
    var mensaje;
    var posicion;
    for (i = 0; i < matriz.length; i++) {
        contador=0;
        for ( j = 0; j < matriz[i].length; j++) {
            if (matriz[i][j]== 0) {
                contador++;
            }

            if (contador==matriz[i].length) {
                matriz.splice(i, 1);
                posicion= parseInt(i, 10)+1;
                mensaje ="Se eliminó F<sub>"+posicion+"</sub>";
                imprimir(matriz, mensaje);

                i=0;
            }
            
        }
        
    }

    for (i = 0; i < matriz.length; i++) {
        contador=0;
        for ( j = 0; j < (matriz[i].length-1); j++) {
            if (matriz[i][j]== 0) {
                contador++;
            }
            
        }

        if(contador==matriz[i].length-1){

            return false;
        }
        
        
    }


    return matriz;
}



function imprimir(matriz, mensaje){

    var i, j;
    var imprimirProcedimiento = document.getElementById('Imprimir');
    var dato;

    var procedimiento = "<table border=0 cellspacing='30px'>";

    procedimiento += "<tr><td rowspan="+matriz.length+1+" align='center'>"+mensaje+"</td></tr>";
    
    for(i=0; i<matriz.length; i++){
        
        procedimiento += "<tr>";
        for(j=0;j<matriz[i].length;j++){
            /*var expsa = '2x + 3x';
            console.log(math.simplify(expsa).toString());
            console.log(math.format(math.fraction(0.125), { fraction: 'ratio' }));
            */
            
            if(matriz[i][j]%1==0){
                procedimiento += '<td align=center>'+matriz[i][j]+'</td>';
            }else{
                dato = math.format(math.fraction(matriz[i][j]), { fraction: 'ratio' })
                procedimiento += '<td align=center>'+dato+'</td>';
            }
            
        }
    
    }
    
    
    procedimiento += "</tr></table><br><br><br>";
    
    imprimirProcedimiento.insertAdjacentHTML('beforeend', procedimiento);
    
}


function imprimirResultados(matriz, n_col){
    
    var i, j, k=0, m, h, g, o, p;
    var a, b;
    var vector="";
    
    var suma = "";
    var imprimirresultadoFinal = document.getElementById('Resultados3');
    var imprimirCombinacion = document.getElementById('combinacionLineal');
    //document.getElementById('Resultados2').innerHTML="El sistema tiene soluciones infinitas <br><br>";
    
    var lamnda = "";
    var lamndaAux = "";
    var dato;
    var independiente="";
    var verif=false;
    
    var rango;
    var rangoA;
    var contadorr=0, contadorrA=0;
    var nulo=new Array(matriz[0].length-1);

    for(a=0; a<matriz.length; a++){
        for(b=0; b<matriz[a].length; b++){
            if(a==b){
                contadorrA++;
            }
        }
    }
    for(a=0; a<matriz.length-1; a++){
        for(b=0; b<matriz[a].length-1; b++){
            if(a==b){
                contadorr++;
            }
        }
    }
    var num_parametroLibre;
    rango = contadorr;
    rangoA = contadorrA;
    if(rangoA==rango){
        num_parametroLibre=rango-n_col-1;
    }
    console.log(num_parametroLibre);

    var resultadoFinal = "<table border=0 cellspacing='30px'>";
    var combinacion = "";
    var auxCombinacion="";
    combinacion+="(";
    for(i=0; i<copiaMatriz.length; i++){
        
            if(i!=copiaMatriz.length-1){
                combinacion+=copiaMatriz[i][copiaMatriz[i].length-1]+", ";
            }else{
                combinacion+=copiaMatriz[i][copiaMatriz[i].length-1];
            }
            
            //console.log(copiaMatriz[i][j]);
        
    }
    combinacion+=")=< (";


    for(i=0; i<matriz.length; i++){
        resultadoFinal += "<tr>";
        for(j=0, o=0; j<matriz[i].length-1; j++){
            if(matriz[i][j]==1&&j==i){
                document.getElementById('Resultados2').innerHTML="El sistema tiene solución única <br><br>";
                for(k=(j+1), m=(matriz[i].length-i), p=0; k<matriz[i].length-1; k++, m--){
                    if(matriz[i][k]==0){
                        suma=suma+"";
                    }else{
                        document.getElementById('Resultados2').innerHTML="El sistema tiene soluciones infinitas <br><br>";
                        //nulo[p]= new Array(matriz[i].length);
                        //suma+="(";
                        if(matriz[i][k]>0){
                            dato = math.format(math.fraction(((-1)*(matriz[i][k]))), { fraction: 'ratio' });
                            if(((-1)*(matriz[i][k]))%1==0){
                                suma=suma+((-1)*(matriz[i][k]))+" &lambda;<sub>"+(m)+"</sub> ";
                                //nulo[p][o]=(-1)*(matriz[i][k]);
                                console.log((-1)*(matriz[i][k]));
                                //combinacion+=((-1)*(matriz[i][k]))+" &lambda;<sub>"+(m)+"</sub> ";
                            }else{
                                suma=suma+dato+" &lambda;<sub>"+(m)+"</sub> ";
                                //nulo[p][o]=dato;
                                console.log(dato);
                                //combinacion+=dato+" &lambda;<sub>"+(m)+"</sub> ";
                            }
                            
                        }else{
                            dato = math.format(math.fraction(((-1)*(matriz[i][k]))), { fraction: 'ratio' });
                            if(((-1)*(matriz[i][k]))%1==0){
                                suma=suma+" + "+((-1)*(matriz[i][k]))+" &lambda;<sub>"+(m)+"</sub> ";
                                //nulo[p][o]=(-1)*(matriz[i][k]);
                                console.log((-1)*(matriz[i][k]));
                                //combinacion+=" + "+((-1)*(matriz[i][k]))+" &lambda;<sub>"+(m)+"</sub> ";
                            }else{
                                suma=suma+" + "+dato+" &lambda;<sub>"+(m)+"</sub> ";
                                //nulo[p][o]=dato;
                                console.log(dato);
                                //combinacion+=" + "+dato+" &lambda;<sub>"+(m)+"</sub> ";
                            }

                        }
                        //suma+=")(v<sub>"+i+"</sub>)";
                        verif=true;
                        p++;
                        
                    }

                    if(i==matriz.length-1){
                        lamnda += '<tr><td align=center>x<sub>'+(k+1)+"</sub>=  &lambda;<sub>"+m+'</sub></td>';
                        //nulo[p][o]=1;
                        
                        
                        for(g=k; g<k+1; g++){
                            for(h=0; h<copiaMatriz.length; h++){
                                if(h!=(copiaMatriz.length-1)){
                                    vector+=copiaMatriz[h][g]+", ";
                                }else{
                                    vector+=copiaMatriz[h][g];
                                }
                                
                            }
                        }
                        
                        if(k!=matriz[i].length-2){
                            auxCombinacion+="&lambda;<sub>"+m+'</sub>('+vector+'), ';
                        }else{
                            auxCombinacion+="&lambda;<sub>"+m+'</sub>('+vector+')';
                        }
                        vector="";
                        
                    }
                    
                }
                dato = math.format(math.fraction(matriz[i][matriz[i].length-1]), { fraction: 'ratio' });
                /*
                for(h=0; h<n_col-1; h++){
                    if(h!=n_col-2){
                        vector+=copiaMatriz[h][i]+", ";
                    }else{
                        vector+=copiaMatriz[h][i];
                    }
                    
                }
                */
                
                for(g=i; g<i+1; g++){
                    for(h=0; h<copiaMatriz.length; h++){
                        if(h!=(copiaMatriz.length-1)){
                            vector+=copiaMatriz[h][g]+", ";
                        }else{
                            vector+=copiaMatriz[h][g];
                        }
                        
                    }
                }
                
                if(matriz[i][matriz[i].length-1]%1==0){
                    resultadoFinal += '<td align=center>x<sub>'+(i+1)+"</sub>=("+matriz[i][matriz[i].length-1]+" "+suma+')</td>';
                    if(i!=matriz.length-1){
                        combinacion+="("+matriz[i][matriz[i].length-1]+suma+")("+vector+"), ";
                    }else{
                        if(auxCombinacion==""){
                            combinacion+="("+matriz[i][matriz[i].length-1]+suma+")("+vector+")";
                        }else{
                            combinacion+="("+matriz[i][matriz[i].length-1]+suma+")("+vector+"), ";
                        }
                        
                    }
                }else{
                    resultadoFinal += '<td align=center>x<sub>'+(i+1)+"</sub>=("+dato+" "+suma+')</td>';
                    if(i!=matriz.length-1){
                        combinacion+="("+dato+suma+")("+vector+"), ";
                    }else{
                        if(auxCombinacion==""){
                            combinacion+="("+dato+suma+")("+vector+")";
                        }else{
                            combinacion+="("+dato+suma+")("+vector+"), ";
                        }
                        
                    }
                }
                
                
                
                /*
                if(matriz[i][j]%1==0){
                    procedimiento += '<td align=center>'+matriz[i][j]+'</td>';
                }else{
                    dato = math.format(math.fraction(matriz[i][matriz[i].length-1]), { fraction: 'ratio' })
                    procedimiento += '<td align=center>'+dato+'</td>';
                }
                */
                
            }else if(matriz[i][j]==0&&j==i){
                for(k=(j+1), m=(matriz[i].length-i); k<matriz[i].length-1; k++, m--){
                    

                    if(i==matriz.length-1){
                        lamnda += '<tr><td align=center>x<sub>'+(k+1)+"</sub>=  &lambda;<sub>"+(m+1)+'</sub></td>';
                        
                        for(g=k; g<k+1; g++){
                            for(h=0; h<copiaMatriz.length; h++){
                                if(h!=(copiaMatriz.length-1)){
                                    vector+=copiaMatriz[h][g]+", ";
                                }else{
                                    vector+=copiaMatriz[h][g];
                                }
                                
                            }
                        }
                        
                        if(k!=matriz[i].length-2){
                            auxCombinacion+="&lambda;<sub>"+m+'</sub>('+vector+'), ';
                        }else{
                            auxCombinacion+="&lambda;<sub>"+m+'</sub>('+vector+')';
                        }
                        vector="";
                        
                    }
                    
                }
                dato = math.format(math.fraction(matriz[i][matriz[i].length-1]), { fraction: 'ratio' });
                /*
                for(h=0; h<n_col-1; h++){
                    if(h!=n_col-2){
                        vector+=copiaMatriz[h][i]+", ";
                    }else{
                        vector+=copiaMatriz[h][i];
                    }
                    
                }
                */
                
                for(g=i; g<i+1; g++){
                    for(h=0; h<copiaMatriz.length; h++){
                        if(h!=(copiaMatriz.length-1)){
                            vector+=copiaMatriz[h][g]+", ";
                        }else{
                            vector+=copiaMatriz[h][g];
                        }
                        
                    }
                }
                
                
                resultadoFinal += '<td align=center>x<sub>'+(i+1)+"</sub>=("+matriz[i][matriz[i].length-1]+" "+suma+')</td>';
                if(i!=matriz.length-1){
                    combinacion+="("+matriz[i][matriz[i].length-1]+suma+")("+vector+"), ";
                }else{
                    if(auxCombinacion==""){
                        combinacion+="("+matriz[i][matriz[i].length-1]+suma+")("+vector+")";
                    }else{
                        combinacion+="("+matriz[i][matriz[i].length-1]+suma+")("+vector+"), ";
                    }
                    
                }
                
            }

            vector="";
            suma="";   
            
            if(verif){
                o++;
                verif=false;
            }
        }
        
        
    }
    if(auxCombinacion==""){
        combinacion+=">";
    }else{
        combinacion+=auxCombinacion+">";
    }
    combinacion+="<br>&there4;Es una combinación lineal";
    resultadoFinal += "</tr>";

    resultadoFinal += '</tr>'+lamnda;    

    resultadoFinal += "</tr></table><br><br><br>";
    imprimirresultadoFinal.insertAdjacentHTML('beforeend', resultadoFinal);
    //document.getElementById("independiente").innerHTML = independiente;
    //imprimirCombinacion.insertAdjacentHTML('beforeend', combinacion);

    document.getElementById('Imprimir').insertAdjacentHTML('beforeend', resultadoFinal);
    /*
    for(i=0; i<nulo.length; i++){
        for(j=0; j<nulo[i].length; j++){
            console.log(nulo[i][j]);
            console.log("Holas")
        }
    }*/


    var co=0;
    if((matriz.length==matriz[0].length-1)||(matriz.length>matriz[0].length-1)){
        for(i=0; i<nulo.length; i++){
            nulo[i]=new Array(1);

        }
        for(i=0; i<nulo.length; i++){
            for(j=0; j<nulo[i].length; j++){
                nulo[i][j]=0;
            }
        }
    }else{
        for(i=0; i<copiaMatriz[0].length-1; i++){
            nulo[i]=new Array();
        }
        for(i=0; i<matriz.length; i++){
            
            for(j=matriz.length, k=0; j<matriz[i].length-1; j++, k++){
                //console.log(matriz[i][j]);
                nulo[i][k]=(-1)*(matriz[i][j]);
                /*
                nulo[i][k]=co;
                co++;
                */
            }
        }

        for(m=matriz.length, o=0; m<matriz[0].length-1; i++, m++, o++){
            for(j=matriz.length, h=0; j<matriz[0].length-1; j++, h++){
                if(o==h){
                    nulo[i][h]=1;
                    console.log("Holis");
                }else{
                    nulo[i][h]=0;
                    console.log("Holisaaaas");
                }
            }
        }
    }
    
    console.log(nulo.length);
    for(i=0; i<nulo.length; i++){
        
        for(j=0; j<nulo[i].length; j++){
            console.log(nulo[i][j]);
        }
    }
    var baseNu="";
    var imprimirbaseNu = document.getElementById('BaseNu');

    baseNu = "Base<sub>Nu</sub>=";
    baseNu += "<";

    for(j=0;j<nulo[0].length;j++){
        baseNu += "(";
        baseNu += "<tr>";
        for(i=0; i<nulo.length; i++){
            /*var expsa = '2x + 3x';
            console.log(math.simplify(expsa).toString());
            console.log(math.format(math.fraction(0.125), { fraction: 'ratio' }));
            */
            if(i!=nulo.length-1){
                if(nulo[i][j]%1==0){
                    baseNu += nulo[i][j]+', ';
                }else{
                    dato = math.format(math.fraction(nulo[i][j]), { fraction: 'ratio' })
                    baseNu += dato+', ';
                }
            }else{
                if(nulo[i][j]%1==0){
                    if(j!=nulo[0].length-1){
                        baseNu += nulo[i][j]+'), ';
                    }else{
                        baseNu += nulo[i][j]+')';
                    }
                    
                }else{
                    if(j!=nulo[0].length-1){
                        dato = math.format(math.fraction(nulo[i][j]), { fraction: 'ratio' })
                        baseNu += dato+'), ';
                    }else{
                        dato = math.format(math.fraction(nulo[i][j]), { fraction: 'ratio' })
                        baseNu += dato+')';
                    }
                }
            }
            
            
        }
    
    }
    
    
    baseNu += ">";

    imprimirbaseNu.insertAdjacentHTML('beforeend', baseNu);

    var imagen = new Array(copiaMatriz.length);
    for(i=0; i<copiaMatriz.length; i++){
        imagen[i]= new Array(copiaMatriz[i].length-1);
        for(j=0; j<copiaMatriz[i].length-1; j++){
            imagen[i][j]=copiaMatriz[i][j];
        }
    }
    while(!calcularLI(imagen)){
        for(i=0; i<imagen.length; i++){
            imagen[i].splice(imagen[i].length-1, 1);
        }
    }
    
    
    var baseim="";
    var imprimirbaseim = document.getElementById('BaseIm');

    baseim = "Base<sub>Im</sub>=";
    baseim += "<";

    for(j=0;j<imagen[0].length;j++){
        baseim += "(";
        baseim += "<tr>";
        for(i=0; i<imagen.length; i++){
            /*var expsa = '2x + 3x';
            console.log(math.simplify(expsa).toString());
            console.log(math.format(math.fraction(0.125), { fraction: 'ratio' }));
            */
            if(i!=imagen.length-1){
                if(imagen[i][j]%1==0){
                    baseim += imagen[i][j]+', ';
                }else{
                    dato = math.format(math.fraction(imagen[i][j]), { fraction: 'ratio' })
                    baseim += dato+', ';
                }
            }else{
                if(imagen[i][j]%1==0){
                    if(j!=imagen[i].length-1){
                        baseim += imagen[i][j]+'), ';
                    }else{
                        baseim += imagen[i][j]+')';
                    }
                    
                }else{
                    if(j!=imagen[i].length-1){
                        dato = math.format(math.fraction(imagen[i][j]), { fraction: 'ratio' })
                        baseim += dato+'), ';
                    }else{
                        dato = math.format(math.fraction(imagen[i][j]), { fraction: 'ratio' })
                        baseim += dato+')';
                    }
                }
            }
            
            
        }
    
    }
    
    
    baseim += ">";

    imprimirbaseim.insertAdjacentHTML('beforeend', baseim);



}