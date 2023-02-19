import data from "../../submissionData.json"; // do not create this file

describe("Test", function () {
  Cypress.Screenshot.defaults({
    scale: true,
    onBeforeScreenshot(el) {
      const nav = el.find(".position-sticky");
      const prof = el.find(".js-user-profile-sticky-bar");

      if (nav) {
        nav.attr("style", "position:static !important");
        prof.attr("style", "position:static !important");
      }
    },
    onAfterScreenshot(el) {
      const nav = el.find(".position-sticky");
      const prof = el.find(".js-user-profile-sticky-bar");

      if (nav) {
        nav.attr("style", "position:sticky !important");
        prof.attr("style", "position:sticky !important");
      }
    },
  });
  let acc_score = 0;
  let user_data;
  let user;

  data.map(({ submission_link: url, id }) => {
    user = url.split("=")[1].split("&")[0];
    if (url && url.length) {
      this.beforeAll(() => {
        cy.visit(url);
        cy.get('[id="user_search_results"]').within(($list) => {
          cy.wrap($list).get(".mr-1").eq(0).click();
        });
      });

      it("Validity check", () => {
        cy.request(`https://api.github.com/users/${user}`).should((d) => {
          user_data = d;
        });
      });

      it(`Linkedin to be present in ReadMe`, () => {
        cy.get('article[itemprop="text"]').within(($div) => {
          cy.wrap($div)
            .get("a")
            .each((el) => {
              let href = el.attr("href");
              if (href.search("https://linkedin.com/in/") != -1)
                cy.request({ url: href, failOnStatusCode: false });
            });
        });
        cy.then(() => {
          acc_score += 1;
        });
      });

      it(`Links are working in Readme`, () => {
        cy.get('article[itemprop="text"]').within(($div) => {
          cy.wrap($div)
            .get("a")
            .each((el) => {
              let href = el.attr("href");
              if (
                href.search("https://linkedin.com") != -1 ||
                href.search(/..github.io/) != -1
              )
                cy.request({ url: href, failOnStatusCode: false });
            });
        });
        cy.then(() => {
          acc_score += 1;
        });
      });

      it(`All Links in readme are updated and working`, () => {
        cy.get('article[itemprop="text"]').within(($div) => {
          cy.wrap($div)
            .get("a")
            .each((el) => {
              let href = el.attr("href");
              let x = (href.includes('linkedin'));
              if (!x)
                cy.request({ url: href }).its("status").should("eq", 200);
            });
        });
        cy.then(() => {
          acc_score += 1;
        });
      });

      it(`Profile description should be present`, () => {
        cy.expect(user_data.body.bio).not.to.be.empty;
        cy.then(() => {
          acc_score += 1;
        });
      });
      it(`At least 50 followers should be present`, () => {
        expect(user_data.body.followers).to.be.gte(50);
        cy.then(() => {
          acc_score += 1;
        });
      });
      it(`Address should be present`, () => {
        expect(user_data.body.location).not.to.be.empty;
        cy.then(() => {
          acc_score += 1;
        });
      });
      it(`Portfolio link should be present in Profile Section(deployed on github.io)`, () => {
        cy.expect(user_data.body.blog).contains("github.io");
        cy.request(user_data.body.blog).its("status").should("eq", 200);
        cy.then(() => {
          acc_score += 1;
        });
      });

      it(`Minimum 3 Pinned Repositories to be present`, () => {
        cy.request(
          `https://gh-pinned-repos.egoist.dev/?username=${user}`
        ).should((data) => {
          cy.expect(data.body.length).to.be.gte(3);
        });
        cy.then(() => {
          acc_score += 1;
        });
      });

      it("Pinned Repos have description", () => {
        cy.request(
          `https://gh-pinned-repos.egoist.dev/?username=${user}`
        ).should((data) => {
          cy.get(data.body).each((repo) => {
            cy.expect(repo.description).not.to.be.empty;
          });
        });
        cy.then(() => {
          acc_score += 1;
        });
      });

      it("Portfolio link is present in ReadMe & is the same as the deployed link in the Profile Section", () => {
        cy.get('article[itemprop="text"]').within(($div) => {
          cy.wrap($div)
            .get("a[href*='.github.io/']")
            .should("have.attr", "href")
            .then((href) => {
              cy.request(href).its("status").should("eq", 200);
              expect(
                href,
                `Portfolio link in ReadMe not the same as the one in Profile Section`
              ).to.equal(user_data.body.blog);
              acc_score += 1;
            });
        });
      });

      it("Screenshot of the Page", () => {
        cy.wait(2000);
        cy.screenshot("Screenshot -- Profile_Page", {
          capture: "fullPage",
        });
      });

      it(`generate score`, () => {
        console.log(acc_score);
        let result = {
          id,
          marks: Math.floor(acc_score),
        };
        result = JSON.stringify(result);
        cy.writeFile("results.json", `\n${result},`, { flag: "a+" }, (err) => {
          if (err) {
            console.error(err);
          }
        });
      });
    }
  });
});
