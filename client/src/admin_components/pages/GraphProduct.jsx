import React, { useEffect, useState } from "react";
import CanvasJSReact from "../../../src/grafh_lib/canvasjs.react";
import { API_URL, doApiGet } from "../../services/services";
import { useSearchParams } from "react-router-dom";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const GraphProduct = () => {
  const [ar, setAr] = useState([]);
  const [getQuery] = useSearchParams();

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    let perPage = getQuery.get("perPage") || 100;
    let url = `${API_URL}/products?perPage=${perPage}`;
  
    try {
      let data = await doApiGet(url);
      const product_ar = ["shirts", "jewelry", "shoes", "pant", "hat", "glass"];
  
      // סינון הפריטים לפי קטגוריות
      let temp_ar = data.filter(item => product_ar.includes(item.category));
  
      // ספירת כמות הפריטים בכל קטגוריה
      let itemCounts = temp_ar.reduce((acc, item) => {
        if (!acc[item.category]) {
          acc[item.category] = 1;
        } else {
          acc[item.category]++;
        }
        return acc;
      }, {});
  
      // המרת המידע לצורת נתוני גרף
      let graph_ar = Object.keys(itemCounts).map(category => {
        let obj = {
          label: category,
          y: itemCounts[category]
        };
        return obj;
      });
  
      console.log(temp_ar);
      console.log(graph_ar);
      setAr(graph_ar);
    } catch (err) {
      console.log(err);
      alert("There is a problem, please come back later");
    }
  };

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", //"light1", "dark1", "dark2"
    title: {
      text: "Graph the number of products by category",
    },
    axisY: {
      includeZero: true,
    //   title: "Number",
    },
    axisX: {
      includeZero: false,
    //   title: "Products",
    },
  
    data: [
      {
        type: "column", //change type to bar, line, area, pie, etc
        // indexLabel: "{y}", //Shows y value on all Data Points
        indexLabelFontColor: "#5A5757",
        indexLabelPlacement: "outside",
        dataPoints: ar,
      },
    ],
  };

  return (
    <div >
      {/* <h2>Graph of something</h2> */}

      <CanvasJSChart
        options={options}
        /* onRef={ref => this.chart = ref} */
      />
    </div>
  );
};

export default GraphProduct;
