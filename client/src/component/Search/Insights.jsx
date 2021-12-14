import React from "react";

import GaugeChart from "react-gauge-chart";

function Insights({ cardsData }) {
  if (cardsData) {
    var cards = cardsData.map(function (cards) {
      return (
        <>
          <div
            className="col-sm-12 col-md-6 col-lg-4"
            key={cards.title}
            style={{ cursor: "pointer" }}
          >
            <span className="card-item d-block">
              <div className="foto">
                <div style={{ width: "" }}>
                  <GaugeChart
                    id="gauge-chart"
                    nrOfLevels={10}
                    colors={["#00ff1e", "#f2ff00", "#fa1100"]}
                    arcWidth={0.3}
                    percent={cards.percent}
                    textColor="#000000"
                    needleColor="#dedede"
                    needleBaseColor="#4a4a4a"
                  />
                  <p className="card-title-settings mt-3">{cards.title}</p>
                </div>
              </div>
            </span>
          </div>
        </>
      );
    });
  }

  return (
    <section id="card">
      <div className="col-md-12">
        <div className="col-md-12">
          <div className="row">{cards}</div>
        </div>
      </div>
    </section>
  );
}

export default Insights;