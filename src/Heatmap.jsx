
import React, { useState } from "react";
import { severityData, years } from "./roadData";

function Heatmap() {
  const [selectedYear, setSelectedYear] = useState("all");

  const getColor = (value) => {
    const intensity = (value - 7) / (82 - 7);
    const red = Math.round(255);
    const green = Math.round(245 - intensity * 190);
    const blue = Math.round(235 - intensity * 205);

    return `rgb(${red}, ${green}, ${blue})`;
  };

  return (
    <section
      style={{
        padding: "30px",
        background: "#ffffff",
        borderRadius: "16px",
        color: "#222",
        marginTop: "30px",
        overflowX: "auto"
      }}
    >
      <h2 style={{ fontSize: "24px", marginBottom: "8px" }}>
        Road Accident Severity Across India
      </h2>

      <p style={{ color: "#666", marginBottom: "20px" }}>
        Deaths per 100 road accidents across states and union territories
      </p>

      <label style={{ fontWeight: "600" }}>
        Select year:{" "}
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          style={{
            padding: "9px 14px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginLeft: "8px",
            cursor: "pointer"
          }}
        >
          <option value="all">All Years</option>
          {years.map((year) => (
            <option key={year} value={String(year)}>
              {year}
            </option>
          ))}
        </select>
      </label>

      <div style={{ marginTop: "25px", minWidth: "500px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: selectedYear === "all"
              ? "2fr repeat(3, 1fr)"
              : "2fr 1fr",
            gap: "8px",
            fontWeight: "bold",
            padding: "12px",
            borderBottom: "2px solid #ddd"
          }}
        >
          <span>State / UT</span>
          {(selectedYear === "all" ? years : [Number(selectedYear)]).map(
            (year) => (
              <span key={year} style={{ textAlign: "center" }}>
                {year}
              </span>
            )
          )}
        </div>

        {severityData.map((item) => (
          <div
            key={item.state}
            style={{
              display: "grid",
              gridTemplateColumns: selectedYear === "all"
                ? "2fr repeat(3, 1fr)"
                : "2fr 1fr",
              gap: "8px",
              padding: "7px 12px",
              alignItems: "center",
              borderBottom: "1px solid #eee"
            }}
          >
            <span style={{ fontSize: "13px", fontWeight: "500" }}>
              {item.state}
            </span>

            {(selectedYear === "all"
              ? item.values
              : [item.values[years.indexOf(Number(selectedYear))]
                ]
            ).map((value, index) => (
              <div
                key={index}
                title={`${item.state}: ${value} deaths per 100 accidents`}
                style={{
                  background: getColor(value),
                  padding: "10px 5px",
                  textAlign: "center",
                  borderRadius: "6px",
                  fontWeight: "600",
                  color: value > 48 ? "white" : "#333"
                }}
              >
                {value}
              </div>
            ))}
          </div>
        ))}
      </div>

      <p style={{ marginTop: "20px", fontSize: "12px", color: "#777" }}>
        Source: Project dataset, 2020–2022. Higher values indicate
        greater accident fatality severity.
      </p>
    </section>
  );
}

export default Heatmap;
