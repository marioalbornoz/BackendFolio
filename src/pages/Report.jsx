import React, { useContext } from 'react'
import { FolioContext } from '../context/FolioContext';
import {Pie, Bar} from 'react-chartjs-2';
import { ObtenerNumMes } from '../helpers';
import MyLoader from '../components/MyLoader';

export const Report = () => {
    const {
      folios,
      foliostotales,
      foliospriorityone,
      foliosprioritytwo,
    } = useContext(FolioContext);
    
    const contadorMes = (mes) => {
      const foliosmes = folios.filter(foliosfilter => ObtenerNumMes(foliosfilter.created) === mes)
      return foliosmes.length;
    }
    const data = {
      labels:['Prioridad 1', 'Prioridad 2'],
      datasets:[{
        data:[(foliospriorityone.length*100/foliostotales), (foliosprioritytwo.length*100/foliostotales)],
        backgroundColor:['#FF5734', '#ffc107'],

      }]
    };
    const opciones = {
      responsive: true,
    }

    const datosBarra = {
      labels: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ],
      datasets: [
        {
          label: "Cantidad de folios",
          backgroundColor: "#73B775",
          borderColor: "black",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(31, 111, 208, 1)",
          hoverBorderColor: "white",
          data: [
            contadorMes(0),
            contadorMes(1),
            contadorMes(2),
            contadorMes(3),
            contadorMes(4),
            contadorMes(5),
            contadorMes(6),
            contadorMes(7),
            contadorMes(8),
            contadorMes(9),
            contadorMes(10),
            contadorMes(11),
          ],
        },
      ],
    };
    const optionBar={
      maintainAspectRatio:false,
      responsive:true
    }
    
    
    return (
      <div className="col-lg-9 col-md-8 ml-4 mt-5 report">
        <div className="row">
          <div className="col">
            <h6 className="lead mb-4">Reportes</h6>
            {foliostotales && foliospriorityone && foliosprioritytwo ? (
              <>
                <div className="row">
                  <div className="col-lg-5  col-md-6 col-sm-12">
                    <div className="card bg-light text-dark mimosa mb-4 white-text shadow">
                      <div className="card-body">
                        <div className="pull-right">
                          <i className="fas fa-chart-line"></i>
                          <p>Cantidad de folios</p>
                          <h4>{foliostotales}</h4>
                        </div>
                        <div className="card-body">
                          <Pie data={data} options={opciones} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-12">
                    <div className="card bg-danger text-white mimosa mb-4 white-text shadow">
                      <div className="card-body">
                        <div className="pull-right">
                          <i className="fas fa-chart-line"></i>
                          <p>Prioridad 1</p>
                          <h4>{foliospriorityone.length}</h4>
                        </div>
                        <div className="progress md-progress">
                          <div
                            className="progress-bar bg grey darken-3"
                            role="progressbar"
                            style={{
                              width:
                                (foliospriorityone.length * 100) /
                                foliostotales,
                            }}
                            aria-valuenow={foliospriorityone.length}
                            aria-valuemin="0"
                            aria-valuemax={foliostotales}
                          ></div>
                        </div>
                        <div className="card-body">
                          <p className="mb-0">
                            Ingresados hasta la fecha (
                            {Math.round((foliospriorityone.length * 100) / foliostotales)}
                            %)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="card bg-warning text-white mimosa mb-4 white-text shadow">
                      <div className="card-body">
                        <div className="pull-right">
                          <i className="fas fa-chart-line"></i>
                          <p>Prioridad 2</p>
                          <h4>{foliosprioritytwo.length}</h4>
                        </div>
                        <div className="progress md-progress">
                          <div
                            className="progress-bar bg grey darken-3"
                            role="progressbar"
                            style={{
                              width:
                                (foliosprioritytwo.length * 100) /
                                foliostotales,
                            }}
                            aria-valuenow={foliosprioritytwo.length}
                            aria-valuemin="0"
                            aria-valuemax={foliostotales}
                          ></div>
                        </div>
                        <div className="card-body">
                          <p className="mb-0">
                            Ingresados hasta la fecha (
                            {Math.round((foliosprioritytwo.length * 100) / foliostotales)}
                            %)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div
                      className="card bg-light text-dark my-5 shadow p-3 mb-5 rounded"
                      style={{ width: "100% ", height: "300px" }}
                    >
                      <Bar data={datosBarra} options={optionBar} />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    
                  </div>
                </div>
              </>
            ) : <MyLoader />}
            {}
          </div>
        </div>
      </div>
    );
}
