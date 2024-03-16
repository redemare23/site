document.addEventListener("DOMContentLoaded", async function () {
    try {
      // URL da API
      const apiUrl = 'https://apex.oracle.com/pls/apex/redemare/conteudos/textos';
  
      // Fazendo uma solicitação GET usando Fetch
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        throw new Error('Erro ao recuperar os dados da API');
      }
  
      const data = await response.json();
  
      // Manipular e exibir os dados na página HTML
      console.log(data);
      displayData(data.items);
    } catch (error) {
      console.error('Erro durante a solicitação:', error);
    }
  
    // Função para exibir os dados na página HTML
    function displayData(items) {
      // Exibindo o conteúdo principal
      const updateElement = (elementId, content) => {
        const element = document.getElementById(elementId);
        if (element) {
          element.innerHTML = content;
        }
      };
  
      updateElement('titulo', items[0]?.titulo || '');
      updateElement('conteudo-principal', items[0]?.conteudo || '');
  
      updateElement('titulo-mapa1', items[1]?.titulo || '');
      updateElement('conteudo-mapa1', items[1]?.conteudo || '');
  
      updateElement('titulo-mapa2', items[2]?.titulo || '');
      updateElement('conteudo-mapa2', items[2]?.conteudo || '');
  
      updateElement('Mangue-titulo', items[3]?.titulo || '');
      updateElement('Mangue-conteudo', items[3]?.conteudo || '');
  
      updateElement('Restiga-titulo', items[4]?.titulo || '');
      updateElement('Restiga-conteudo', items[4]?.conteudo || '');
  
      updateElement('pa1-titulo', items[5]?.titulo || '');
      updateElement('pa1-conteudo', items[5]?.conteudo || '');
  
      updateElement('pa2-titulo', items[6]?.titulo || '');
      updateElement('pa2-conteudo', items[6]?.conteudo || '');
  
      updateElement('pa3-titulo', items[7]?.titulo || '');
      updateElement('pa3-conteudo', items[7]?.conteudo || '');
  
      updateElement('pa4-titulo', items[8]?.titulo || '');
      updateElement('pa4-conteudo', items[8]?.conteudo || '');
  
      updateElement('pa5-titulo', items[9]?.titulo || '');
      updateElement('pa5-conteudo', items[9]?.conteudo || '');
  
      updateElement('pa6-titulo', items[10]?.titulo || '');
      updateElement('pa6-conteudo', items[10]?.conteudo || '');
    }
  });
  