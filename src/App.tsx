import React, { useEffect, useState } from "react";
import "./App.css";
import { TProduct } from "./product";
import { ColumnsType } from "antd/es/table";
import TableDefault from "./components/table";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme/theme";
import { message, Typography } from "antd";
import api from "./services/api";

const { Text } = Typography;

function App() {
  const columns: ColumnsType<TProduct> = [
    {
      title: "Produto",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Fases",
      dataIndex: "fases",
      key: "fases",
      children: [
        {
          title: "PCP",
          dataIndex: "PCP",
          key: "PCP",
          render: (PCP) => {
            return renderAux(PCP);
          },
        },
        {
          title: "Explosão de materiais",
          dataIndex: "explosionOf",
          key: "explosionOf",
          render: (explosionOf) => {
            return renderAux(explosionOf);
          },
        },
        {
          title: "Corte Interno",
          dataIndex: "cut",
          key: "cut",
          render: (cut) => {
            return renderAux(cut);
          },
        },
        {
          title: "Conferência do corte",
          dataIndex: "checkCut",
          key: "checkCut",
          render: (checkCut) => {
            return renderAux(checkCut);
          },
        },
        {
          title: "Sublimação",
          dataIndex: "sublimation",
          key: "sublimation",
          render: (sublimation) => {
            return renderAux(sublimation);
          },
        },
        {
          title: "Conferência da sublimação",
          dataIndex: "checkSublimation",
          key: "checkSublimation",
          render: (checkSublimation) => {
            return renderAux(checkSublimation);
          },
        },
        {
          title: "Costura externa",
          dataIndex: "sew",
          key: "sew",
          render: (sew) => {
            return renderAux(sew);
          },
        },
        {
          title: "Conferência da costura",
          dataIndex: "checkSew",
          key: "checkSew",
          render: (checkSew) => {
            return renderAux(checkSew);
          },
        },
        {
          title: "Aplique de aviamento",
          dataIndex: "applyOf",
          key: "applyOf",
          render: (applyOf) => {
            return renderAux(applyOf);
          },
        },
        {
          title: "Passadoria",
          dataIndex: "passadoria",
          key: "passadoria",
          render: (passadoria) => {
            return renderAux(passadoria);
          },
        },
        {
          title: "Embalagem",
          dataIndex: "packUp",
          key: "packUp",
          render: (packUp) => {
            return renderAux(packUp);
          },
        },
        {
          title: "DPA",
          dataIndex: "dpa",
          key: "dpa",
          render: (dpa) => {
            return renderAux(dpa);
          },
        },
      ],
    },
  ];
  const [productData, setProductData] = useState<TProduct[]>([]);
  const renderAux = (col: string) => {
    const timestamp = parseInt(col);
    const dateDisplay = new Date(timestamp);
    if (!isNaN(dateDisplay as any)) {
      const colDateAux = new Date(dateDisplay);

      const ano = colDateAux.getFullYear();
      const mes = colDateAux.getMonth();
      const dia = colDateAux.getDate();
      const colDate = new Date(ano, mes, dia);

      const nowDateAux = new Date();
      const anoNow = nowDateAux.getFullYear();
      const mesNow = nowDateAux.getMonth();
      const diaNow = nowDateAux.getDate();

      const nowDate = new Date(anoNow, mesNow, diaNow);

      if (colDate.getTime() > nowDate.getTime()) {
        return (
          <Text type="danger">{new Date(col).toLocaleDateString("pt-br")}</Text>
        );
      } else if (colDate.getTime() < nowDate.getTime()) {
        return <Text>{new Date(dateDisplay).toLocaleDateString("pt-br")}</Text>;
      } else if (colDate.getTime() === nowDate.getTime()) {
        return <Text>{new Date(dateDisplay).toLocaleDateString("pt-br")}</Text>;
      }
    }
  };
  const convertDate = (date: string) => {
    return date
      .replaceAll("/", "")
      .replaceAll("Date(", "")
      .replaceAll(")", "")
      .trim();
  };
  const createRows = (unParsedRes: any) => {
    const row: TProduct[] = [];
    const rowAux: TProduct[] = [];
    if (unParsedRes[0].length) {
      Object.keys(unParsedRes).map((prod: any) => {
        if (!unParsedRes[prod].length) {
          switch (unParsedRes[prod].fase) {
            case "PCP ( PLANEJAMENTO )":
              row.push({
                product: unParsedRes[prod].cod_produto,
                PCP: convertDate(unParsedRes[prod].data_previsto),
              });
              break;
            case "EXPLOSÃO DE MATERIAIS":
              row.push({
                product: unParsedRes[prod].cod_produto,
                explosionOf: convertDate(unParsedRes[prod].data_previsto),
              });
              break;
            case "CORTE INTERNO":
              row.push({
                product: unParsedRes[prod].cod_produto,
                cut: convertDate(unParsedRes[prod].data_previsto),
              });
              break;
            case "CONFERÊNCIA DO CORTE":
              row.push({
                product: unParsedRes[prod].cod_produto,
                checkCut: convertDate(unParsedRes[prod].data_previsto),
              });
              break;
            case "SUBLIMAÇÃO":
              row.push({
                product: unParsedRes[prod].cod_produto,
                sublimation: convertDate(unParsedRes[prod].data_previsto),
              });
              break;
            case "CONFERÊNCIA DA SUBLIMAÇÃO":
              row.push({
                product: unParsedRes[prod].cod_produto,
                checkSublimation: convertDate(unParsedRes[prod].data_previsto),
              });
              break;
            case "COSTURA EXTERNA":
              row.push({
                product: unParsedRes[prod].cod_produto,
                sew: convertDate(unParsedRes[prod].data_previsto),
              });
              break;
            case "CONFERÊNCIA DA COSTURA":
              row.push({
                product: unParsedRes[prod].cod_produto,
                checkSew: convertDate(unParsedRes[prod].data_previsto),
              });
              break;
            case "APLIQUE DE AVIAMENTO":
              row.push({
                product: unParsedRes[prod].cod_produto,
                applyOf: convertDate(unParsedRes[prod].data_previsto),
              });
              break;
            case "PASSADORIA":
              row.push({
                product: unParsedRes[prod].cod_produto,
                passadoria: convertDate(unParsedRes[prod].data_previsto),
              });
              break;
            case "EMBALAGEM":
              row.push({
                product: unParsedRes[prod].cod_produto,
                packUp: convertDate(unParsedRes[prod].data_previsto),
              });
              break;
            case "DPA":
              row.push({
                product: unParsedRes[prod].cod_produto,
                dpa: convertDate(unParsedRes[prod].data_previsto),
              });
              break;
            default:
              break;
          }
        } else {
          Object.keys(unParsedRes[prod]).map((prodDouble: any, index) => {
            switch (unParsedRes[prod][prodDouble].fase) {
              case "PCP ( PLANEJAMENTO )":
                rowAux[index] = {
                  product: unParsedRes[prod][prodDouble].cod_produto,
                  PCP: convertDate(unParsedRes[prod][prodDouble].data_previsto),
                };
                break;
              case "EXPLOSÃO DE MATERIAIS":
                rowAux[index] = {
                  product: unParsedRes[prod][prodDouble].cod_produto,
                  explosionOf: convertDate(
                    unParsedRes[prod][prodDouble].data_previsto
                  ),
                };
                break;
              case "CORTE INTERNO":
                rowAux[index] = {
                  product: unParsedRes[prod][prodDouble].cod_produto,
                  cut: convertDate(unParsedRes[prod][prodDouble].data_previsto),
                };
                break;
              case "CONFERÊNCIA DO CORTE":
                rowAux[index] = {
                  product: unParsedRes[prod][prodDouble].cod_produto,
                  checkCut: convertDate(
                    unParsedRes[prod][prodDouble].data_previsto
                  ),
                };
                break;
              case "SUBLIMAÇÃO":
                rowAux[index] = {
                  product: unParsedRes[prod][prodDouble].cod_produto,
                  sublimation: convertDate(
                    unParsedRes[prod][prodDouble].data_previsto
                  ),
                };
                break;
              case "CONFERÊNCIA DA SUBLIMAÇÃO":
                rowAux[index] = {
                  product: unParsedRes[prod][prodDouble].cod_produto,
                  checkSublimation: convertDate(
                    unParsedRes[prod][prodDouble].data_previsto
                  ),
                };
                break;
              case "COSTURA EXTERNA":
                rowAux[index] = {
                  product: unParsedRes[prod][prodDouble].cod_produto,
                  sew: convertDate(unParsedRes[prod][prodDouble].data_previsto),
                };
                break;
              case "CONFERÊNCIA DA COSTURA":
                rowAux[index] = {
                  product: unParsedRes[prod][prodDouble].cod_produto,
                  checkSew: convertDate(
                    unParsedRes[prod][prodDouble].data_previsto
                  ),
                };
                break;
              case "APLIQUE DE AVIAMENTO":
                rowAux[index] = {
                  product: unParsedRes[prod][prodDouble].cod_produto,
                  applyOf: convertDate(
                    unParsedRes[prod][prodDouble].data_previsto
                  ),
                };
                break;
              case "PASSADORIA":
                rowAux[index] = {
                  product: unParsedRes[prod][prodDouble].cod_produto,
                  passadoria: convertDate(
                    unParsedRes[prod][prodDouble].data_previsto
                  ),
                };
                break;
              case "EMBALAGEM":
                rowAux[index] = {
                  product: unParsedRes[prod][prodDouble].cod_produto,
                  packUp: convertDate(
                    unParsedRes[prod][prodDouble].data_previsto
                  ),
                };
                break;
              case "DPA":
                rowAux[index] = {
                  product: unParsedRes[prod][prodDouble].cod_produto,
                  dpa: convertDate(unParsedRes[prod][prodDouble].data_previsto),
                };
                break;
              default:
                break;
            }
          });
        }
      });
    } else {
      Object.keys(unParsedRes).map((prod: any) => {
        switch (unParsedRes[prod].fase) {
          case "PCP ( PLANEJAMENTO )":
            row.push({
              product: unParsedRes[prod].cod_produto,
              PCP: convertDate(unParsedRes[prod].data_previsto),
            });
            break;
          case "EXPLOSÃO DE MATERIAIS":
            row.push({
              product: unParsedRes[prod].cod_produto,
              explosionOf: convertDate(unParsedRes[prod].data_previsto),
            });
            break;
          case "CORTE INTERNO":
            row.push({
              product: unParsedRes[prod].cod_produto,
              cut: convertDate(unParsedRes[prod].data_previsto),
            });
            break;
          case "CONFERÊNCIA DO CORTE":
            row.push({
              product: unParsedRes[prod].cod_produto,
              checkCut: convertDate(unParsedRes[prod].data_previsto),
            });
            break;
          case "SUBLIMAÇÃO":
            row.push({
              product: unParsedRes[prod].cod_produto,
              sublimation: convertDate(unParsedRes[prod].data_previsto),
            });
            break;
          case "CONFERÊNCIA DA SUBLIMAÇÃO":
            row.push({
              product: unParsedRes[prod].cod_produto,
              checkSublimation: convertDate(unParsedRes[prod].data_previsto),
            });
            break;
          case "COSTURA EXTERNA":
            row.push({
              product: unParsedRes[prod].cod_produto,
              sew: convertDate(unParsedRes[prod].data_previsto),
            });
            break;
          case "CONFERÊNCIA DA COSTURA":
            row.push({
              product: unParsedRes[prod].cod_produto,
              checkSew: convertDate(unParsedRes[prod].data_previsto),
            });
            break;
          case "APLIQUE DE AVIAMENTO":
            row.push({
              product: unParsedRes[prod].cod_produto,
              applyOf: convertDate(unParsedRes[prod].data_previsto),
            });
            break;
          case "PASSADORIA":
            row.push({
              product: unParsedRes[prod].cod_produto,
              passadoria: convertDate(unParsedRes[prod].data_previsto),
            });
            break;
          case "EMBALAGEM":
            row.push({
              product: unParsedRes[prod].cod_produto,
              packUp: convertDate(unParsedRes[prod].data_previsto),
            });
            break;
          case "DPA":
            row.push({
              product: unParsedRes[prod].cod_produto,
              dpa: convertDate(unParsedRes[prod].data_previsto),
            });
            break;
          default:
            break;
        }
      });
    }

    row.push(...rowAux);
    return row;
  };

  const groupeByProdCode = (listaDeProdutos: any) => {
    return listaDeProdutos.reduce((resultado: any, produto: any) => {
      if (!resultado[produto.cod_produto]) {
        resultado[produto.cod_produto] = [];
      }
      resultado[produto.cod_produto].push(produto);
      return resultado;
    });
  };
  const filterArr = (array: any) => {
    return array.filter(
      (valor: any, index: any) => array.indexOf(valor) === index
    );
  };
  const checkEqual = (array: any) => {
    if (array.length === 0) {
      return true;
    }

    const fase = array[0].fase;

    for (let i = 1; i < array.length; i++) {
      if (array[i].fase !== fase) {
        return false;
      }
    }

    return true;
  };

  const verificarFasesDiferentes = (array: any) => {
    const fases = array.map((obj: any) => obj.fase);

    for (let i = 0; i < fases.length; i++) {
      if (fases.indexOf(fases[i]) !== i) {
        return false;
      }
    }

    return true;
  };
  const groupeBykey = (array: any, chave: any) => {
    return array.reduce(function (resultado: any, item: any) {
      if (!resultado[item[chave]]) {
        resultado[item[chave]] = [];
      }
      resultado[item[chave]].push(item);
      return resultado;
    }, {});
  };
  const parseDate = (date: string) => {
    const timestamp = parseInt(date.split("-")[0]);
    const offsetMinutos = parseInt(date.split("-")[1]);

    const data = new Date(timestamp + offsetMinutos * 60 * 1000);
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = String(data.getFullYear()).slice(2);

    const dataFormatada = `${dia}/${mes}/${ano}`;
    return dataFormatada;
  };
  const renameKeys = (prods: any) => {
    const keys = Object.keys(prods);
    const newKeys = keys.map((key) => key.replace(/^0+/, ""));
    const values = Object.values(prods);
    const newObj: any = {};

    newKeys.forEach((newKey, index) => {
      newObj[newKey] = values[index];
    });

    return newObj;
  };
  useEffect(() => {
    const formatedRes: any = [];
    const doubleRes: any = [];

    const fetchData = async () => {
      try {
        // setProductData(prodTst);
        const res = await api.get("");
        const groupedRes = groupeByProdCode(res.data.value);
        const groupedResRenamed = renameKeys(groupedRes);
        Object.keys(groupedResRenamed).map((prod: any) => {
          if (groupedResRenamed[prod]) {
            if (groupedResRenamed[prod].length === 1) {
              formatedRes.push(groupedResRenamed[prod][0]);
            } else if (groupedResRenamed[prod].length >= 2) {
              doubleRes.push(groupedResRenamed[prod]);
            }
          }
        });

        // setProductData(res.data.data);
      } catch (error) {
        message.error("Verifique os dados e tente novamente.");
      }
    };
    fetchData().then(() => {
      const formatedDoubleRes: any = [];
      doubleRes.map((prod: any) => {
        if (typeof prod !== "string") {
          if (checkEqual(prod)) {
            const maior = prod.reduce((objetoA: any, objetoB: any) => {
              const date1 = convertDate(objetoA.data_previsto);
              const date2 = convertDate(objetoB.data_previsto);

              const dataA = parseDate(date1);
              const dataB = parseDate(date2);
              return dataA > dataB ? objetoA : objetoB;
            });

            formatedDoubleRes.push(maior);
          } else if (verificarFasesDiferentes(prod)) {
            //   "todas são diferentes, apenas adicionar normalmente",
            //   prod
            // );
            formatedDoubleRes.push(prod);
          } else {
            const groupedByFase = groupeBykey(prod, "fase");
            //fases únicas
            const faseKeys: any[] = filterArr(Object.keys(groupedByFase));
            let objetoComDataMaior;
            faseKeys.forEach((key) => {
              if (groupedByFase[key].length >= 2) {
                objetoComDataMaior = groupedByFase[key].reduce(
                  (objetoA: any, objetoB: any) => {
                    const date1 = convertDate(objetoA.data_previsto);
                    const date2 = convertDate(objetoB.data_previsto);
                    const dataA = parseDate(date1);
                    const dataB = parseDate(date2);
                    return dataA > dataB ? objetoA : objetoB;
                  }
                );
                //retornar o objeto normalmente
                formatedDoubleRes.push(objetoComDataMaior);
              } else {
                // retornar objeto normalmente
                formatedDoubleRes.push(groupedByFase[key]);
              }
            });
          }
        }
      });
      // formatedDoubleRes // tratar
      const rows: any[] = [];
      const singleResToRows = createRows(formatedRes) as any;
      const doubleResToRows = createRows(formatedDoubleRes) as any;

      rows.push(...singleResToRows);
      rows.push(...doubleResToRows);

      setProductData(rows);
    });
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <TableDefault columns={columns} data={productData} title="Produtos" />
    </ThemeProvider>
  );
}

export default App;
