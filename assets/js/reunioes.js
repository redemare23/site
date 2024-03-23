document.addEventListener("DOMContentLoaded", async function () {
    try {
      // URL da API
      const apiUrl = 'https://apex.oracle.com/pls/apex/redemare/conteudos/reunioes-atas';

  
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
      const reunioesAtasSection = document.getElementById('reunioes-atas');
  
      // Iterar sobre os itens e criar HTML para cada um
      items.forEach(item => {
        const li = document.createElement('li');
        li.className = 'media mb-4';
        li.innerHTML = `
          <i class="fas fa-file-alt mr-3" style="font-size: 2rem;"></i>
          <div class="media-body">
            <h5 class="mt-0 mb-1">${item.titulo}</h5>
            <p class="mb-1"><em>${item.descricao}</em></p>
            <p class="text-muted mb-1">${translateDate(item.criado)}</p>
            <a href="#" class="btn btn-outline-dark btn-sm">Saber Mais</a>
          </div>`;
        reunioesAtasSection.querySelector('ul').appendChild(li);
      });
    }

    // Função para traduzir a data para português
    function translateDate(dateString) {
      const monthsMap = {
        "January": "Janeiro",
        "February": "Fevereiro",
        "March": "Março",
        "April": "Abril",
        "May": "Maio",
        "June": "Junho",
        "July": "Julho",
        "August": "Agosto",
        "September": "Setembro",
        "October": "Outubro",
        "November": "Novembro",
        "December": "Dezembro"
      };
      // Substituindo o nome do mês em inglês pelo equivalente em português
      for (const [monthEng, monthPt] of Object.entries(monthsMap)) {
        if (dateString.includes(monthEng)) {
          dateString = dateString.replace(monthEng, monthPt);
          break;
        }
      }
      return dateString;
    }
});
