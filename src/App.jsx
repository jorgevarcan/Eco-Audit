import { useState, useEffect } from 'react'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import './App.css'

function App() {
  const [paso, setPaso] = useState(0);
  const [respuestas, setRespuestas] = useState(() => {
    const guardado = localStorage.getItem('audit-30-respuestas');
    return guardado ? JSON.parse(guardado) : {};
  });

  useEffect(() => {
    localStorage.setItem('audit-30-respuestas', JSON.stringify(respuestas));
  }, [respuestas]);

  const cuestionario = [
    // 1. DIGNIDAD HUMANA
    { id: 1, cat: "Dignidad Humana", p: "¿Cómo es la cultura de respeto al personal?", opts: [{t:"Cultura de aprecio total", pts:4}, {t:"Trato profesional básico", pts:2}, {t:"Ambiente hostil/tenso", pts:0}] },
    { id: 2, cat: "Dignidad Humana", p: "¿Se respetan los derechos en la cadena de suministro?", opts: [{t:"Auditorías externas", pts:4}, {t:"Confianza verbal", pts:1}, {t:"No se controla", pts:0}] },
    { id: 3, cat: "Dignidad Humana", p: "¿Condiciones de trabajo?", opts: [{t:"Superan el convenio", pts:4}, {t:"Estrictamente legales", pts:1}, {t:"Precarias", pts:0}] },
    { id: 4, cat: "Dignidad Humana", p: "¿Salud física y mental?", opts: [{t:"Plan de bienestar activo", pts:4}, {t:"Mínimo preventivo", pts:1}, {t:"Inexistente", pts:0}] },
    { id: 5, cat: "Dignidad Humana", p: "¿Inclusión y diversidad?", opts: [{t:"Plan de igualdad activo", pts:4}, {t:"Sin plan definido", pts:1}, {t:"No es prioridad", pts:0}] },
    { id: 6, cat: "Dignidad Humana", p: "¿Conciliación vida-trabajo?", opts: [{t:"Flexibilidad total", pts:4}, {t:"Cierta flexibilidad", pts:2}, {t:"Horario rígido", pts:0}] },

    // 2. SOLIDARIDAD
    { id: 7, cat: "Solidaridad", p: "¿Cooperación con otras empresas?", opts: [{t:"Colaboración activa", pts:4}, {t:"Contactos puntuales", pts:2}, {t:"Competencia agresiva", pts:0}] },
    { id: 8, cat: "Solidaridad", p: "¿Proveedores locales?", opts: [{t:"+80% proximidad", pts:4}, {t:"50% proximidad", pts:2}, {t:"Solo precio bajo", pts:0}] },
    { id: 9, cat: "Solidaridad", p: "¿Compartir conocimientos?", opts: [{t:"Open Source / Alianzas", pts:4}, {t:"Bajo petición", pts:1}, {t:"Secreto total", pts:0}] },
    { id: 10, cat: "Solidaridad", p: "¿Apoyo a proyectos sociales?", opts: [{t:"Donación sistemática", pts:4}, {t:"Aportes puntuales", pts:2}, {t:"No se apoya", pts:0}] },
    { id: 11, cat: "Solidaridad", p: "¿Plazos de pago?", opts: [{t:"Inmediato o <30 días", pts:4}, {t:"Plazo legal", pts:2}, {t:">60 días", pts:0}] },
    { id: 12, cat: "Solidaridad", p: "¿Redes de economía?", opts: [{t:"Socio activo EBC", pts:4}, {t:"Conoce el modelo", pts:1}, {t:"No participa", pts:0}] },

    // 3. SOSTENIBILIDAD ECOLÓGICA
    { id: 13, cat: "Sostenibilidad Ecológica", p: "¿Origen de la energía?", opts: [{t:"100% Renovable", pts:4}, {t:"Mix estándar", pts:1}, {t:"Energía fósil", pts:0}] },
    { id: 14, cat: "Sostenibilidad Ecológica", p: "¿Gestión de residuos?", opts: [{t:"Residuo Cero", pts:4}, {t:"Reciclaje básico", pts:2}, {t:"Sin control", pts:0}] },
    { id: 15, cat: "Sostenibilidad Ecológica", p: "¿Movilidad sostenible?", opts: [{t:"Ayudas bus/bici", pts:4}, {t:"Teletrabajo parcial", pts:2}, {t:"Coche particular", pts:0}] },
    { id: 16, cat: "Sostenibilidad Ecológica", p: "¿Ecodiseño?", opts: [{t:"Circularidad total", pts:4}, {t:"Duradero", pts:2}, {t:"Desechable", pts:0}] },
    { id: 17, cat: "Sostenibilidad Ecológica", p: "¿Eficiencia en equipos?", opts: [{t:"Tecnología A+++", pts:4}, {t:"Estándar", pts:2}, {t:"Obsoletos", pts:0}] },
    { id: 18, cat: "Sostenibilidad Ecológica", p: "¿Métricas ambientales?", opts: [{t:"Huella de carbono", pts:4}, {t:"Consumo eléctrico", pts:1}, {t:"Sin métricas", pts:0}] },

    // 4. JUSTICIA SOCIAL
    { id: 19, cat: "Justicia Social", p: "¿Brecha salarial?", opts: [{t:"Menos de 1:3", pts:4}, {t:"Menos de 1:10", pts:2}, {t:"Más de 1:20", pts:0}] },
    { id: 20, cat: "Justicia Social", p: "¿Transparencia fiscal?", opts: [{t:"Pago local total", pts:4}, {t:"Sin paraísos", pts:2}, {t:"Optimización fiscal", pts:0}] },
    { id: 21, cat: "Justicia Social", p: "¿Reparto de beneficios?", opts: [{t:"Reinversión social", pts:4}, {t:"Equitativo", pts:2}, {t:"Solo dueños", pts:0}] },
    { id: 22, cat: "Justicia Social", p: "¿Igualdad de género?", opts: [{t:"Igualdad total", pts:4}, {t:"Pequeña brecha", pts:1}, {t:"Sin control", pts:0}] },
    { id: 23, cat: "Justicia Social", p: "¿Precios?", opts: [{t:"Precios justos", pts:4}, {t:"Mercado", pts:2}, {t:"Maximización", pts:0}] },
    { id: 24, cat: "Justicia Social", p: "¿Desarrollo profesional?", opts: [{t:"Plan para todos", pts:4}, {t:"Solo técnicos", pts:2}, {t:"No hay plan", pts:0}] },

    // 5. DEMOCRACIA
    { id: 25, cat: "Democracia", p: "¿Transparencia info?", opts: [{t:"Libro abierto", pts:4}, {t:"Info básica", pts:2}, {t:"Confidencial", pts:0}] },
    { id: 26, cat: "Democracia", p: "¿Toma de decisiones?", opts: [{t:"Voto democrático", pts:4}, {t:"Consulta previa", pts:2}, {t:"Vertical", pts:0}] },
    { id: 27, cat: "Democracia", p: "¿Estructura jerárquica?", opts: [{t:"Horizontal", pts:4}, {t:"Mandos medios", pts:2}, {t:"Muy vertical", pts:0}] },
    { id: 28, cat: "Democracia", p: "¿Elección de cargos?", opts: [{t:"Democrática", pts:4}, {t:"Ratificación", pts:1}, {t:"Designación", pts:0}] },
    { id: 29, cat: "Democracia", p: "¿Memoria anual?", opts: [{t:"Balance EBC", pts:4}, {t:"Solo cuentas", pts:1}, {t:"Sin memoria", pts:0}] },
    { id: 30, cat: "Democracia", p: "¿Grupos de interés?", opts: [{t:"Diálogo activo", pts:4}, {t:"Encuestas", pts:2}, {t:"Ignorados", pts:0}] },
  ];

  const totalPuntos = Object.values(respuestas).reduce((a, b) => a + b, 0);
  const esUltimoPaso = paso === cuestionario.length;

  const calcularDatosGrafico = () => {
    const categorias = ["Dignidad Humana", "Solidaridad", "Sostenibilidad Ecológica", "Justicia Social", "Democracia"];
    return categorias.map(cat => {
      const preguntasCat = cuestionario.filter(q => q.cat === cat);
      const puntosCat = preguntasCat.reduce((acc, q) => acc + (respuestas[q.id] || 0), 0);
      return { subject: cat, A: puntosCat, fullMark: 24 };
    });
  };

  const getDiagnosticosCriticos = () => {
    const datos = calcularDatosGrafico();
    const puntuacionMinima = Math.min(...datos.map(d => d.A));
    const pilaresCriticos = datos.filter(d => d.A === puntuacionMinima);
    
    return pilaresCriticos.map(pilar => {
      const fallosPilar = cuestionario.filter(q => q.cat === pilar.subject && (respuestas[q.id] || 0) < 4);
      return {
        cat: pilar.subject,
        puntos: pilar.A,
        mejoras: fallosPilar.map(q => ({
          problema: q.p,
          solucion: q.opts.find(o => o.pts === 4).t
        }))
      };
    });
  };

  const seleccionarOpcion = (pts) => {
    setRespuestas({...respuestas, [cuestionario[paso].id]: pts});
  };

  return (
    <div className="container">
      <header>
        <h1>Eco-Audit 🌿</h1>
        <p>Consultoría de Sostenibilidad | Jorge Varela Candela</p>
        {!esUltimoPaso && (
          <div style={{ marginTop: '30px' }}>
            <span className="progress-text">Pregunta {paso + 1} de 30</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${((paso + 1) / cuestionario.length) * 100}%` }}></div>
            </div>
          </div>
        )}
      </header>

      {!esUltimoPaso ? (
        <main className="card">
          <div style={{ textAlign: 'center' }}><span className="categoria-tag">{cuestionario[paso].cat}</span></div>
          <h2 style={{ fontSize: '1.4rem', textAlign: 'center', margin: '20px 0' }}>{cuestionario[paso].p}</h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {cuestionario[paso].opts.map((opt, i) => (
              <button key={i} className={`btn-opcion ${respuestas[cuestionario[paso].id] === opt.pts ? 'active' : ''}`} onClick={() => seleccionarOpcion(opt.pts)}>
                {opt.t}
              </button>
            ))}
          </div>
          <div className="nav-container">
            <button className="btn-nav" disabled={paso === 0} onClick={() => setPaso(paso - 1)}>⬅️ Anterior</button>
            <button className="btn-nav btn-next" disabled={respuestas[cuestionario[paso].id] === undefined} onClick={() => setPaso(paso + 1)}>
              {paso === 29 ? "Finalizar ✅" : "Siguiente ➡️"}
            </button>
          </div>
        </main>
      ) : (
        <main className="card" style={{ textAlign: 'center' }}>
          <div className="resultado-box">
            <h2>Puntuación Global</h2>
            <div className="puntos-large">{totalPuntos}</div>
            <div style={{ padding: '8px 20px', background: totalPuntos > 80 ? '#27ae60' : totalPuntos > 40 ? '#f39c12' : '#e74c3c', borderRadius: '25px', fontWeight: 'bold' }}>
               {totalPuntos > 80 ? 'Óptimo' : totalPuntos > 40 ? 'Mejorable' : 'Crítico'}
            </div>
          </div>

          <div style={{ width: '100%', height: 300, marginTop: '20px' }}>
            <h3>Análisis de Madurez por Pilar</h3>
            <ResponsiveContainer>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={calcularDatosGrafico()}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{fontSize: 10, fontWeight: 'bold'}} />
                <Radar name="Pyme" dataKey="A" stroke="#27ae60" fill="#27ae60" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* LISTADO DINÁMICO DE ÁREAS CRÍTICAS */}
          <div style={{ marginTop: '40px', textAlign: 'left' }}>
            {getDiagnosticosCriticos().map((diag, idx) => (
              <div key={idx} style={{ background: '#fff5f5', padding: '25px', borderRadius: '15px', borderLeft: '8px solid #e74c3c', marginBottom: '20px' }}>
                <h3 style={{ color: '#c0392b', marginTop: 0 }}>⚠️ Área Crítica: {diag.cat}</h3>
                <p>Has obtenido solo <strong>{diag.puntos} / 24</strong> puntos en esta área.</p>
                <div style={{ marginTop: '15px' }}>
                  <strong style={{ color: '#2d3748' }}>Acciones Recomendadas:</strong>
                  <ul style={{ paddingLeft: '20px', marginTop: '10px', color: '#4a5568' }}>
                    {diag.mejoras.map((m, i) => (
                      <li key={i} style={{ marginBottom: '10px' }}>
                        Para <em>"{m.problema}"</em> deberías implementar: <strong>{m.solucion}</strong>.
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          
          <button className="btn-nav" style={{ marginTop: '30px', width: '100%' }} onClick={() => {localStorage.clear(); window.location.reload();}}>Reiniciar Auditoría</button>
        </main>
      )}
    </div>
  )
}

export default App
