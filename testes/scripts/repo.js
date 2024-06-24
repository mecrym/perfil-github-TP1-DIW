document.addEventListener("DOMContentLoaded", function() {
    // Inicializa o GitHub Calendar
    GitHubCalendar(".github-calendar", "mecrym", {
        responsive: true,
        global_stats: true,
        tooltips: true // Ativa tooltips para informações adicionais ao passar o mouse
    });

    // Manipula eventos de hover nas células de contribuição
    const calendar = document.querySelector('.github-calendar');
    if (calendar) {
        const contribCells = calendar.querySelectorAll('rect.day');

        // Adiciona animação de hover
        contribCells.forEach(cell => {
            cell.addEventListener('mouseover', () => {
                cell.classList.add('hovered');
            });

            cell.addEventListener('mouseout', () => {
                cell.classList.remove('hovered');
            });
        });
    }
});
