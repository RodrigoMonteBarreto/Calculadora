class CalcController{


    constructor(){
        this._operation = []
        this._locale = 'pt-BR'
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();

    }

    initialize(){
        
        this.setDisplayDateTime()
        // o metodo setInterval serve para colocar intervalo de tempos entre a execução de operações
        // esse metodo poderia ser aplicar tbm com um alert que para cada 3 segundos exibisse uma mensagem para o usuario
        // para encerrar esse metodo chama o setTimeOut(), cria um variavel pra receber o id de setInterval e joga esse variavel no 
        //parametro da função setTimeOut()
        setInterval(()=>{
            
            this.setDisplayDateTime()

        },1000 )
    }

    initButtonsEvents(){

        // está buscando o id dos buttons e usa o sinal > para pegar os filhos de buttons os seus g
        // o mesmo se faz para parts, pega tbm seus filhos
        let buttonsAll = document.querySelectorAll("#buttons > g, #parts > g")


        // irá fazer chamada do eventlistener para escutar todos os eventos
        // o addEventListener recebe dois parametros, o primeiro é qual evento que quer escutar
        // neste caso será o evento de clique. o Segungo é uma função 

        // ARROWFUNCTION: Quando a ARROWFUNCTION tiver apenas um parametro não há necessidade de colocar 
        // entre parenteses, agora caso seja mais de um parametro é obrigatorio colocar os parasentese ()
        // Ver exemplo logo abaixo

        // o addEventListener é um metodo que pega apenas um evento por vez
        // buttons.addEventListener('click', e =>{

        // })

        buttonsAll.forEach((btn, index) =>{
            this.addEventListenerAll(btn,'click drag', e =>{
                
                //utiliza linha abaixo irá pega o btn(botão), o baseVal irá extrair o conteuro do btn
                // e o replace(substituir) servirá para trocar o btn- por nada, por isso no primeiro parametro 
                //passa o que quer trocar e no segundo subistitiu por outro valor, neste caso não irá colocar nada no lugar

              let textBtn = btn.className.baseVal.replace("btn-", "")
              
              // o metodo execBtn irá pegar o botão digitado e irá percorrer o switch para verificar qual
              // botão foi digitado
              this.execBtn(textBtn)
            })

            this.addEventListenerAll(btn,"mouseover mouseup mousedown", e=>{

                btn.style.cursor = "pointer"
            })
        })


    }

    clearAll(){
        this._operation = []
    }

    clearEntry(){
        //neste metodo irei utilizar o pop para eliminar o ultimo elemento do array
        this._operation.pop()
    }


    getLastOperation(){

      return this._operation[this._operation.length - 1]

    }

    setLastOpration(value){

        this._operation[this._operation.length - 1 ] = value
    }

    isOperator(value){

        //o indexOf verifica se o valor passado no parametro existe dentro do array
      return(['+', '-', '*', '%', '/'].indexOf(value) > -1);
    }

    pushOperation(value){

        this._operation.push(value);

        //Esse if serve para verificar as posições do array pra realizar os calculos e já jogar na tela
      if(this._operation.length > 3){

            this.calc()
      }
    }

    calc(){
        //o ultimo operador do array será salvo na variavel last, e será feito o calculo dos primeiros
        // pares do array
        let last = this._operation.pop()
        

        //esse trecho de codigo comentado serve para pegar a penultima posição
        // esse trecho pode ser ultilizado caso o usuario use o igual para somar o resultado com 
        // o penultimo valor que tinha sido posto 

        // let penultima = this._operation[this._operation.length - 1];

        // if(!isNaN(penultima)){
        //     console.log('Penultima', penultima);
        // } else {
        //     console.log('é operador cara')
        // }
        

        

        // o join irá juntar as 3 primeiras posições do array
        // o eval irá realizar a operação dessa junção
        //result irá receber o resultado desta operação e irá coloca-lo na 1ª posição do array
        let result = eval(this._operation.join(""))

        // agora o array this._operation irá receber resulta na 1ª posição
        // a segunda posição do array será a variavel last, que ficou guardada após a 3ª posição
        //do array ser preenchida
        this._operation = [result, last]
         
    }

    setLastNumberToDisplay(){


    }

    addOperation(value){

        if(isNaN(this.getLastOperation())){
            // não for numero 
            if(this.isOperator(value)){
                //troca o sinal
                //this._operation[this._operation.length - 1] = value
                this.setLastOpration(value)

            }else if(isNaN(value)) {
                //outra coisa
                console.log('outra coisa',value)
            } else {
                    this.pushOperation(value);
                }
             
        }
        else {
            //se for operador ele entre nesse laço
            if(this.isOperator(value)){

                this.pushOperation(value);    

            } else {
                // se for numero

            //o getLastOperation pega a ultima opercao, neste caso um numero
            // converte ele em string e junta com o valor do parametro que tbm foi concatenado em string
           let newValue = this.getLastOperation().toString() + value.toString();
           this.setLastOpration(parseInt(newValue))

           //setLastNumberToDisplay()
           //atualizar display
            } 

        }

    }

    setError(){
        this.displayCalc = "Error"
    }


    execBtn(value){

        switch (value) {
            case 'ac':
                this.clearAll()
                break;

            case 'ce':
                this.clearEntry()
                break;

            case 'soma':
                this.addOperation('+')
                break;

            case 'igual':
               
                break;

            case 'subtracao':
                this.addOperation('-')
                break;
            
            case 'multiplicacao':
                this.addOperation('*')
                break;
            
            case 'divisao':
                this.addOperation('/')
                break;
            
            case 'porcento':
                this.addOperation('%')
                break;
            
            case 'ponto':
                this.addOperation('.')
                break;
            
            case '0':      
            case '1':
            case '2':                    
            case '3':                
            case '4': 
            case '5':         
            case '6':                    
            case '7':        
            case '8':            
            case '9':

                this.addOperation(parseInt(value));
                break; 

            default:
                this.setError()
                break;
        }

    }

    addEventListenerAll(element, events, fn){

        // o split é um metodo que serve para pegar uma string por exemplo e criar um array
        // "carrro branco e azul". Neste exemplo eu poderia usar o split(' ') e o que definiria cada posição
        //seria a diferença de espaço. teriamos então 4 posições (1carro 2branco 3e 4azul).
        //irei usar o split para criar um array dos eventos que serão utilizados

        events.split(' ').forEach(evento =>{
            element.addEventListener(evento, fn, false)
        })
    }



    // esse metodo serve para inicializar a data e hora, ele pega a data e hora do computador e exibe em tela
    setDisplayDateTime(){
            this.displayDate = this.currentDate.toLocaleDateString(this._locale,{  
                day:"2-digit",   
                month:"short",
                year:"numeric"

                //esses comandos são utilizados para mudar a exibição da data
                //dia com dois digitos
                //mês de forma abreviado, existe a possibilidade de ser long que coloca o nome completo
                // o numeric serve para exibir o ano em 4 digitos exemplo:2018, caso queira com dois digitos
                // basta como 2-digit
            })
            this.displayTime = this.currentDate.toLocaleTimeString(this._locale)
    }


    get displayTime(){
        return this._timeEl.innerHTML
    }

    set displayTime(value){
        return this._timeEl.innerHTML = value
    }

    get displayDate(){
        return this._dateEl.innerHTML
    }

    set displayDate(value){
        return this._dateEl.innerHTML = value
    }

    get displayCalc(){
        return this._displayCalcEl.innerHTML
    }

    set displayCalc(valor){
        this._displayCalcEl.innerHTML = valor
    }

    get currentDate(){
        return  new Date();
    }

    set currentDate(value){
         this._currentDate = value;
    }
}