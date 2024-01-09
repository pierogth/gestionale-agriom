import React from 'react';
import { Container } from 'design-react-kit';

export default function FooterLogin() {
  return (
    <footer className="it-footer text-center">
      <div className="it-footer-main">
        <Container>
          <section>
            <div>
              Copyright {new Date().getFullYear()} Progetti e Soluzioni SpA -
              P.IVA 06423240727
              <br />
              EasySynergy è un marchio registrato e un software sviluppato da
              Progetti e Soluzioni SpA
            </div>
          </section>
        </Container>
      </div>
    </footer>
  );
}
