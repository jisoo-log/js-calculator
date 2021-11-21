import { calculate } from '../../../src/js/utils/calculation';

function getRandomIntInclusive(min = 0, max = 9) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
}

function cipherNumber(...arr) {
  return arr.reduceRight((sum, ele, i) => {
    return (sum += ele * Math.pow(10, arr.length - 1 - i));
  }, 0);
}

before(() => {
  cy.visit('index.html');
});

describe('2개 이상의 숫자에 대해 덧셈이 가능하다', () => {
  let n1, n2, n3, n4, n5, n6;
  const operator = '+';

  beforeEach(() => {
    cy.clickModifier();
    n1 = getRandomIntInclusive();
    n2 = getRandomIntInclusive();
    n3 = getRandomIntInclusive();
    n4 = getRandomIntInclusive();
    n5 = getRandomIntInclusive();
    n6 = getRandomIntInclusive();
  });

  it('1자리 + 1자리', () => {
    cy.clickDigit(n1);
    cy.clickOperation(operator);
    cy.clickDigit(n4);
    cy.clickOperation('=');
    cy.get('#total').should('have.text', cipherNumber(n1) + cipherNumber(n4));
  });

  it('2자리 + 1자리', () => {
    cy.clickDigit(n1);
    cy.clickDigit(n2);
    cy.clickOperation(operator);
    cy.clickDigit(n4);
    cy.clickOperation('=');
    cy.get('#total').should(
      'have.text',
      cipherNumber(n1, n2) + cipherNumber(n4)
    );
  });

  it('3자리 + 1자리', () => {
    cy.clickDigit(n1);
    cy.clickDigit(n2);
    cy.clickDigit(n3);
    cy.clickOperation(operator);
    cy.clickDigit(n4);
    cy.clickOperation('=');
    cy.get('#total').should(
      'have.text',
      cipherNumber(n1, n2, n3) + cipherNumber(n4)
    );
  });

  it('1자리 + 2자리', () => {
    // 1자리 + 2자리
    cy.clickDigit(n1);
    cy.clickOperation(operator);
    cy.clickDigit(n4);
    cy.clickDigit(n5);
    cy.clickOperation('=');
    cy.get('#total').should(
      'have.text',
      cipherNumber(n1) + cipherNumber(n4, n5)
    );
  });

  it('2자리 + 2자리', () => {
    // 2자리 + 2자리
    cy.clickDigit(n1);
    cy.clickDigit(n2);
    cy.clickOperation(operator);
    cy.clickDigit(n4);
    cy.clickDigit(n5);
    cy.clickOperation('=');
    cy.get('#total').should(
      'have.text',
      cipherNumber(n1, n2) + cipherNumber(n4, n5)
    );
  });

  it('3자리 + 2자리', () => {
    cy.clickDigit(n1);
    cy.clickDigit(n2);
    cy.clickDigit(n3);
    cy.clickOperation(operator);
    cy.clickDigit(n4);
    cy.clickDigit(n5);
    cy.clickOperation('=');
    cy.get('#total').should(
      'have.text',
      cipherNumber(n1, n2, n3) + cipherNumber(n4, n5)
    );
  });

  it('1자리 + 3자리', () => {
    cy.clickDigit(n1);
    cy.clickOperation(operator);
    cy.clickDigit(n4);
    cy.clickDigit(n5);
    cy.clickDigit(n6);
    cy.clickOperation('=');
    cy.get('#total').should(
      'have.text',
      cipherNumber(n1) + cipherNumber(n4, n5, n6)
    );
  });

  it('2자리 + 3자리', () => {
    cy.clickDigit(n1);
    cy.clickDigit(n2);
    cy.clickOperation(operator);
    cy.clickDigit(n4);
    cy.clickDigit(n5);
    cy.clickDigit(n6);
    cy.clickOperation('=');
    cy.get('#total').should(
      'have.text',
      cipherNumber(n1, n2) + cipherNumber(n4, n5, n6)
    );
  });

  it('3자리 + 3자리', () => {
    cy.clickDigit(n1);
    cy.clickDigit(n2);
    cy.clickDigit(n3);
    cy.clickOperation(operator);
    cy.clickDigit(n4);
    cy.clickDigit(n5);
    cy.clickDigit(n6);
    cy.clickOperation('=');
    cy.get('#total').should(
      'have.text',
      cipherNumber(n1, n2, n3) + cipherNumber(n4, n5, n6)
    );
  });

  it('예외상황 테스트', () => {
    cy.clickDigit(n1);
    cy.clickOperation('=');
    cy.clickDigit(n2);
    cy.clickOperation('=');
    cy.clickDigit(n3);
    cy.clickOperation('-');
    cy.clickOperation('/');
    cy.clickOperation('/');
    cy.clickOperation('=');
    cy.clickOperation(operator);
    cy.clickOperation('=');
    cy.clickOperation('=');
    cy.clickDigit(n4);
    cy.clickDigit(n5);
    cy.clickDigit(n6);
    cy.clickOperation('=');
    cy.get('#total').should(
      'have.text',
      cipherNumber(n1, n2, n3) + cipherNumber(n4, n5, n6)
    );
  });
});