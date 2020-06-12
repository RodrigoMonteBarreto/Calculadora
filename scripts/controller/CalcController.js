class CalcController{


    constructor(){
        this._locale = 'pt-BR'
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize();

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
        document.querySelectorAll("#buttons > g, #parts > g")
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