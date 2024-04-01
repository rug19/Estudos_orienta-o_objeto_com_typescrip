
/*Iterface: Definindo a estrutura de um objeto, 
especificando quais propriedades e métodos o objeto deve ter.*/
interface IoperacaoMatematica {
  validar(): boolean;
  calcular(): number;
}

/*Classes abstradas: Elas são utilizadas como um tipo de modelo para otras classes, 
não podendo ser instânciada por si só.*/
/* Implements: o termo "implements" é usado em linguagens como Java para indicar que 
uma classe está implementando uma interface. */
abstract class OperacaoMatematica implements IoperacaoMatematica {

  //Método de visibilidade Private: Os membros privados são acessíveis apenas dentro da classe em que são definidos.
  private _numero1: number;
  private _numero2: number;

  /*A principal função do constructor é garantir que um objeto esteja 
  em um estado consistente após ser criado, atribuindo valores iniciais aos seus atributos*/
  constructor(numero1: number, numero2: number) {
    this._numero1 = numero1;
    this._numero2 = numero2;
  }

  //Método acessor get: Método para retornar o resultado.
  get numero1(): number {
    return this._numero1;
  }

  get numero2(): number {
    return this._numero2;
  }

  /*Método de visibilidade Public: Os membros públicos são acessíveis de fora da classe. 
  Isso permite que outros objetos acessem e modifiquem esses membros diretamente.*/
  public validar(): boolean {
    return this._numero1 >= 0 && this._numero2 >= 0;
  }

  public calcular(): number {
    if (this.validar()) {
      return this.realizarCalculo();
    } else {
      return -1;
    }
  }

  /*Método de visibilidade Public: Os membros protegidos são acessíveis 
  apenas dentro da classe em que são definidos e em suas subclasses. */
  protected abstract realizarCalculo(): number;
}

class Soma extends OperacaoMatematica {
  protected override realizarCalculo(): number {
    return this.numero1 + this.numero2;
  }
}

class Subtracao extends OperacaoMatematica {
  protected override realizarCalculo(): number {
    return this.numero1 - this.numero2;
  }
}

class Multiplicacao extends OperacaoMatematica {
  protected override realizarCalculo(): number {
    return this.numero1 * this.numero2;
  }
}

/* Extends: Subescreve as funcionalidades de outra classe, 
podendo utilizar seus métodos e atributos. */
class Divisao extends OperacaoMatematica {
  public override validar(): boolean {
    return this.numero1 >= 0 && this.numero2 >= 0;
  }

  //Override: para indicar explicitamente que está substituindo um método da classe pai.
  protected override realizarCalculo(): number {
    return this.numero1 / this.numero2;
  }
}

/*Method factory:  Esse padrão é um dos padrões de criação, que visa fornecer uma interface 
para criar objetos em uma superclasse, mas permite que as subclasses alterem o tipo de 
objetos que serão criados. */
class FabricaOperacaoMatematica {

  /* Method Static: é um tipo de método que é vinculado à classe em que é definido, 
  em vez de a qualquer instância específica dessa classe. Isso significa que você 
  pode chamar um método estático sem precisar criar um objeto da classe.  */ 
  public static criarOperacaoMatematica(
    numero1: number,
    numero2: number,
    operacao: string
  ): IoperacaoMatematica {
    switch (operacao) {
      case "+":
        return new Soma(numero1, numero2);
      case "-":
        return new Subtracao(numero1, numero2);
      case "*":
        return new Multiplicacao(numero1, numero2);
      default:
        return new Divisao(numero1, numero2);
    }
  }
}



class Calculadora {
  public static calcular(calculo: string): number {
    let partes = calculo.split(" ");
    let numero1 = Number(partes[0]);
    let operacao = partes[1];
    let numero2 = Number(partes[2]);
    let operacaoMatemativa = FabricaOperacaoMatematica.criarOperacaoMatematica(
      numero1, numero2, operacao
    );
    return operacaoMatemativa.calcular()


  }
}

let calculo = "10 + 10";
let resultado = Calculadora.calcular(calculo);

if(resultado >= 0) {
  console.log(`${calculo} = ${resultado} `)
} else {
  console.log("Operação inválida");
}



// let numero1 = 4;
// let numero2 = 5;
// let operacao = "*";


// let operacaoMatemativa = FabricaOperacaoMatematica.criarOperacaoMatematica(
//   numero1,
//   numero2,
//   "operacao"
// );

// let resultado = operacaoMatemativa.calcular();

// if (resultado >= 0) {
//   console.log(`${numero1} ${operacao} ${numero2} = ${resultado}`);
// } else {
//   console.log("Operação inválida");
// }
