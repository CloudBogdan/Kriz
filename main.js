// API KEY: deb5784750810287ea201194c27895d6 
// const url = "https://currate.ru/api/?get=currency_list&key=deb5784750810287ea201194c27895d6";
const url = "https://www.cbr-xml-daily.ru/daily_json.js";

new Vue({
    el: "#app",
    data: {
        curce_data: null,
        curce: 0,
        modal_opened: false,
        valute: {
            name: "USD",
            symbols: {
                "USD": "$",
                "EUR": "€",
                "UAH": "₴",
                "BYN": "₽",
                "PLN": "zł",
                "GBP": "£",
                "KZT": "₸",
                "ILS": "₪"
            }
        },
        changes: 25
    },
    methods: {
        togleModalWindow() {

            const modal = document.querySelector(".modal_window");

            this.modal_opened = !this.modal_opened;

            if (this.modal_opened)
                modal.classList.add("active");
            else
                modal.classList.remove("active");

        },
        chooseValute(name) {

            this.valute.name = name;
            this.getValute();
            
            this.togleModalWindow();
            
        },

        getValute() {

            axios.get(url).then(response => {

                this.curce_data = response.data;
                this.curce = {
                    value: Number(response.data["Valute"][this.valute.name]["Value"].toFixed(2)),
                    old_value: Number(response.data["Valute"][this.valute.name]["Previous"].toFixed(2))
                };
                
            });

            setTimeout(()=> {
                this.calculate();
            }, 20);
            
            console.clear();
        },

        calculate() {

            const bar_track = document.querySelector(".bar .track");

            this.changes = ((100 - (this.curce.old_value * 100 / this.curce.value)) / 2).toFixed(2);
            
            bar_track.style.width = (Math.abs(this.changes) * (100 / 5)) + "%";

        }
    },
    mounted() {
        this.getValute();
    }
});