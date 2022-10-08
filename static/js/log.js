Vue.component("Pagination", Pagination);

new Vue({
    el: '#app',
    components: { Pagination },
    data() {
        return {
            limit: 20,
            page: 1,
            total: 0,
            pageCount: 0,
            logs: {},
        }
    },
    methods: {
        async getLogs(page) {
            try {
                let params = {
                    page: page,
                    limit: this.limit,
                    // debug: 1,
                }
                let searchParams = new URLSearchParams(params);
                let response = await axios.get('/api/v1/logs?' + searchParams)
                this.logs = response.data.data
                this.page = page
                this.total = response.data.total
                this.pageCount = response.data.total_page
                
            } catch (error) {
                console.log(error.message)
            }
        },
        formatDate(date) {
            if (!date) return ''
            const format = "HH:mm:ss DD-MM-YYYY"
            var dateTime = moment(date).format(format);
            return dateTime
        },
    },
    created() {
        this.getLogs(this.page)
    },
});