/// <reference types="cypress" />

describe("Genauigkeit Texteingabe", () => {
    beforeEach(() => {
      cy.visit("http://localhost/kit_testing/public/");
    });
  
    const testCases = [
      {
        description: "Testfall 1 - Alle Informationen vorhanden",
        input: `Ozone, Enzo, 123456789, 2023-07-10, Dies ist eine Testbemerkung.`,
        expected: {
          hersteller: "Ozone",
          modell: "Enzo",
          seriennummer: "123456789",
          letztesWartungsdatum: "2023-07-10",
          bemerkungZustand: "Dies ist eine Testbemerkung.",
        },
      },
      {
        description: "Testfall 2 - Seriennummer fehlt",
        input: `Nova, Mentor, , 2023-06-15, Dies ist eine andere Testbemerkung.`,
        expected: {
          hersteller: "Nova",
          modell: "Mentor",
          seriennummer: "",
          letztesWartungsdatum: "2023-06-15",
          bemerkungZustand: "Dies ist eine andere Testbemerkung.",
        },
      },
      {
        description: "Testfall 3 - Wartungsdatum fehlt",
        input: `Gin, Bonanza, 1122334455, , Guter Zustand, keine Probleme.`,
        expected: {
          hersteller: "Gin",
          modell: "Bonanza",
          seriennummer: "1122334455",
          letztesWartungsdatum: "",
          bemerkungZustand: "Guter Zustand, keine Probleme.",
        },
      },
      {
        description: "Testfall 4 - Bemerkung fehlt",
        input: `Ozone, Rush, 54321, 2023-04-25, `,
        expected: {
          hersteller: "Ozone",
          modell: "Rush",
          seriennummer: "54321",
          letztesWartungsdatum: "2023-04-25",
          bemerkungZustand: "",
        },
      },
      {
        description: "Testfall 5 - Hersteller und Modell fehlen",
        input: `, , 9988776655, 2023-03-15, Leichte Abnutzung sichtbar.`,
        expected: {
          hersteller: "0",
          modell: "0",
          seriennummer: "9988776655",
          letztesWartungsdatum: "2023-03-15",
          bemerkungZustand: "Leichte Abnutzung sichtbar.",
        },
      },
      {
        description: "Testfall 6 - Nur Bemerkung angegeben",
        input: `, , , , Nur Bemerkung hier.`,
        expected: {
          hersteller: "0", // Select-Standardwert ist 0, wenn kein Wert angegeben ist
          modell: "0", // Select-Standardwert ist 0, wenn kein Wert angegeben ist
          seriennummer: "",
          letztesWartungsdatum: "",
          bemerkungZustand: "Nur Bemerkung hier.",
        },
      },
      {
        description: "Testfall 7 - Nur Seriennummer angegeben",
        input: `, , 1122334455, , `,
        expected: {
          hersteller: "0",
          modell: "0",
          seriennummer: "1122334455",
          letztesWartungsdatum: "",
          bemerkungZustand: "",
        },
      },
      {
        description: "Testfall 8 - Unsinnige Eingabe",
        input: `test`,
        expected: {
          hersteller: "0",
          modell: "0",
          seriennummer: "",
          letztesWartungsdatum: "",
          bemerkungZustand: "",
        },
      },
      {
        description: "Testfall 9 - Langer Text mit allen Informationen",
        input: `Hier sind die Details: Der Hersteller ist Nova, das Modell heißt Mentor, die Seriennummer lautet 987654321. Das letzte Wartungsdatum war am 2023-06-15. Bemerkungen zum Zustand: Dies ist eine andere Testbemerkung.`,
        expected: {
          hersteller: "Nova",
          modell: "Mentor",
          seriennummer: "987654321",
          letztesWartungsdatum: "2023-06-15",
          bemerkungZustand: "Dies ist eine andere Testbemerkung.",
        },
      },
      {
        description:
          "Testfall 10 - Langer Text mit einigen fehlenden Informationen",
        input: `Die Angaben sind wie folgt: Hersteller: Gin, Modell: Bonanza, Seriennummer fehlt, Letztes Wartungsdatum: 2023-05-20, Zustand: Guter Zustand, keine Probleme.`,
        expected: {
          hersteller: "Gin",
          modell: "Bonanza",
          seriennummer: "",
          letztesWartungsdatum: "2023-05-20",
          bemerkungZustand: "Guter Zustand, keine Probleme.",
        },
      },
      {
        description: "Testfall 11 - Langer Text ohne Bemerkung",
        input: `Informationen: Ozone produziert das Modell Rush mit der Seriennummer 54321. Das letzte Wartungsdatum war am 2023-04-25. Es gibt keine weiteren Bemerkungen.`,
        expected: {
          hersteller: "Ozone",
          modell: "Rush",
          seriennummer: "54321",
          letztesWartungsdatum: "2023-04-25",
          bemerkungZustand: "",
        },
      },
      {
        description: "Testfall 12 - Langer Text mit komplexen Informationen",
        input: `Der Gleitschirm hat folgende Details: Hersteller ist Nova, Modell ist Ion, Seriennummer lautet 9988776655, das letzte Wartungsdatum war der 2023-03-15. Bemerkung: Leichte Abnutzung sichtbar.`,
        expected: {
          hersteller: "Nova",
          modell: "Ion",
          seriennummer: "9988776655",
          letztesWartungsdatum: "2023-03-15",
          bemerkungZustand: "Leichte Abnutzung sichtbar.",
        },
      },
      {
        description:
          "Testfall 13 - Langer Text mit fehlenden Seriennummer und Bemerkung",
        input: `Gleitschirminformationen: Hersteller: Gin, Modell: Atlas, Seriennummer fehlt, Letztes Wartungsdatum: 2023-02-10, Keine weiteren Bemerkungen.`,
        expected: {
          hersteller: "Gin",
          modell: "Atlas",
          seriennummer: "",
          letztesWartungsdatum: "2023-02-10",
          bemerkungZustand: "",
        },
      },
      {
        description:
          "Testfall 14 - Sehr komplexer und unstrukturierter langer Text",
        input: `Es war ein sonniger Tag und ich war mit meinem neuen Gleitschirm unterwegs. Der Hersteller ist Ozone und das Modell heißt Ion. Meine Seriennummer, falls ich mich recht erinnere, lautet 9988112233. Ich habe ihn zuletzt am 2022-10-10 warten lassen. Ein paar Notizen: Leicht gebraucht, aber funktionsfähig. Ich habe es vor ein paar Wochen überprüft und keine größeren Probleme gefunden. Die Farben sind immer noch lebendig und die Materialien scheinen in gutem Zustand zu sein.`,
        expected: {
          hersteller: "Ozone",
          modell: "Ion",
          seriennummer: "9988112233",
          letztesWartungsdatum: "2022-10-10",
          bemerkungZustand:
            "Leicht gebraucht, aber funktionsfähig. Ich habe es vor ein paar Wochen überprüft und keine größeren Probleme gefunden. Die Farben sind immer noch lebendig und die Materialien scheinen in gutem Zustand zu sein.",
        },
      },
    
    ];
  
    const repetitions = 5;
  
    testCases.forEach(({ description, input, expected }) => {
      for (let i = 1; i <= repetitions; i++) {
        it(`${description} - Wiederholung ${i}`, () => {
          // Klicken auf Button zur Texteingabe
          cy.get("#buttonInputTextModal0").click();
  
          // Text eingeben
          cy.get("#message-textinputTextModal0").type(input, { delay: 0 });
  
          // Klicken auf Bestätigungsbutton
          cy.get("#btn-confirm-inputTextModal0").click();
  
          let correctCount = 0;
          let incorrectCount = 0;
  
          function checkField(selector, expectedValue) {
            cy.get(selector)
              .should("have.value", expectedValue)
              .then(($el) => {
                if ($el.val() === expectedValue) {
                  correctCount++;
                } else {
                  incorrectCount++;
                }
              });
          }
  
          checkField('select[name="hersteller"]', expected.hersteller);
          checkField('select[name="modell"]', expected.modell);
          checkField('input[name="seriennummer"]', expected.seriennummer);
          checkField(
            'input[name="letztes_wartungsdatum"]',
            expected.letztesWartungsdatum
          );
          checkField(
            'textarea[name="bemerkung_zustand"]',
            expected.bemerkungZustand
          );
  
          cy.then(() => {
            console.log(`Test Case: ${description} - Wiederholung ${i}`);
            console.log(`Correctly filled fields: ${correctCount}`);
            console.log(`Incorrectly filled fields: ${incorrectCount}`);
            cy.log(`Test Case: ${description} - Wiederholung ${i}`);
            cy.log(`Correctly filled fields: ${correctCount}`);
            cy.log(`Incorrectly filled fields: ${incorrectCount}`);
          });
        });
      }
    });
  });