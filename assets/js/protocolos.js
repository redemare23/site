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
        const reunioesAtasList = reunioesAtasSection.querySelector('ul');

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
            <button class="btn btn-outline-dark btn-sm" data-id="${item.noticias_divulgacao_id}">Saber Mais</button>
          </div>`;
            reunioesAtasList.appendChild(li);
        });

        // Adicionar evento de clique aos botões "Saber Mais"
        reunioesAtasSection.querySelectorAll('.btn-outline-dark').forEach(btn => {
            btn.addEventListener('click', function () {
                const itemId = btn.getAttribute('data-id');
                fetchContent(itemId);
            });
        });
    }

    // Função para obter o conteúdo da API
    async function fetchContent(itemId) {
        try {
            const contentResponse = await fetch(`https://apex.oracle.com/pls/apex/redemare/conteudos/reunioes-atas/${itemId}`);
            if (!contentResponse.ok) {
                throw new Error('Erro ao recuperar o conteúdo da API');
            }
            const contentData = await contentResponse.json();
            // Ocultar os itens existentes e exibir apenas o conteúdo da ata reunião
            hideItemsAndShowContent(contentData);
        } catch (error) {
            console.error('Erro ao obter o conteúdo:', error);
        }
    }

// Função para ocultar os itens existentes e exibir apenas o conteúdo da ata reunião
function hideItemsAndShowContent(contentData) {
    const reunioesAtasSection = document.getElementById('reunioes-atas');
    const reunioesAtasList = reunioesAtasSection.querySelector('ul');
    
    // Ocultar os itens existentes
    reunioesAtasList.style.display = 'none';
    
    // Criar elemento div para o conteúdo
    const contentElement = document.createElement('div');
    contentElement.className = 'container py-4';
    contentElement.innerHTML = `
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <h3 class="mb-4">${contentData.titulo}</h3>
                <p>${contentData.conteudo}</p>
                <button class="btn btn-outline-dark btn-sm btn-voltar">Voltar</button>
            </div>
        </div>`;

    // Adicionar conteúdo da ata reunião
    reunioesAtasSection.appendChild(contentElement);
    
    // Adicionar evento de clique ao botão "Voltar"
    const btnVoltar = reunioesAtasSection.querySelector('.btn-voltar');
    btnVoltar.addEventListener('click', function () {
        // Exibir novamente os itens originais e remover o conteúdo da ata reunião
        reunioesAtasList.style.display = 'block';
        reunioesAtasSection.removeChild(contentElement);
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
