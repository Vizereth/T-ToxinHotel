import ghpages from "gh-pages";
import path from "path";

// Папка, которую ты хочешь задеплоить (замени если используешь другую)
const distPath = "./dist";

export const deployGH = (done) => {
  ghpages.publish(
    path.resolve(distPath),
    {
      branch: "gh-pages",
      repo: "https://github.com/vizereth/test-toxin-hotel.git",
      message: "Deploy to gh-pages",
    },
    (err) => {
      if (err) {
        console.error("❌ Deployment failed:", err);
      } else {
        console.log("✅ Deployed to gh-pages!");
      }
      done();
    }
  );
};
