<template>

    <v-layout>

        <v-flex>

            <div id="tree" ref="tree"></div>

            <v-text-field label="Neve" v-model="nev" />

            <v-select v-model="kinek" :items="nodes" item-text="name" item-value="id" label="Kinek" />

            <v-select v-model="kije" :items="[
                      {id: 1, name: 'Párja'},
                      {id: 2, name: 'Gyereke'}
                  ]" label="Kije" item-text="name" item-value="id"
            />

            <v-btn @click="add()">Hozzáadás </v-btn>

        </v-flex>

    </v-layout>

</template>

<script>
import OrgChart from "@balkangraph/orgchart.js";

export default {
    name: "FamilyTree",
    data() {
        return {
            nev: null,
            kinek: null,
            chart: null,
            kije: null,
            nodes: [
                { id: 1, tags: ["blue"], name: "King George VI", img: "https://cdn.balkan.app/shared/f1.png"},
                { id: 2, pid: 1, tags: ["partner"], name: "Queen Elizabeth", title: "The Queen Mother", img: "https://cdn.balkan.app/shared/f2.png" },
                { id: 3, pid: 1, tags: ["blue"],  ppid: 2, name: "Queen Elizabeth II", img: "https://cdn.balkan.app/shared/f5.png"},
                { id: 4, pid: 3, tags: ["left-partner"], name: "Prince Philip", title: "Duke of Edinburgh", img: "https://cdn.balkan.app/shared/f3.png"},
                { id: 5, pid: 1, ppid: 2, name: "Princess Margaret", img: "https://cdn.balkan.app/shared/f6.png"},
                { id: 6, pid: 3,tags: ["blue"], ppid: 4, name: "Charles", title: "Prince of Wales", img: "https://cdn.balkan.app/shared/f8.png"},
                { id: 7, pid: 6, tags: ["partner"] , name: "Diana", title: "Princess of Wales", img: "https://cdn.balkan.app/shared/f9.png"},
                { id: 8, pid: 6, tags: ["partner"], name: "Camila", title: "Duchess of Cornwall", img: "https://cdn.balkan.app/shared/f7.png" },
                { id: 9, pid: 3, ppid: 4 , name: "Anne", title: "Princess Royal", img: "https://cdn.balkan.app/shared/f10.png"},
                { id: 10, pid: 3, ppid: 4 , name: "Prince Andrew", title: "Duke of York", img: "https://cdn.balkan.app/shared/f11.png"},
                { id: 11, pid: 3, ppid: 4, name: "Prince Edward", title: "Earl of Wessex", img: "https://cdn.balkan.app/shared/f12.png"},
                { id: 12, pid: 6, ppid: 7, tags: ["blue"], name: "Prince William", title: "Duch of Cambridge", img: "https://cdn.balkan.app/shared/f14.png"},
                { id: 13, pid: 6, ppid: 7, name: "Prince Harry", img: "https://cdn.balkan.app/shared/f15.png"},
                { id: 14, pid: 12, tags: ["left-partner"], name: "Catherine", title: "Duchess of Cambridge", img: "https://cdn.balkan.app/shared/f13.png"},
                { id: 15, pid: 13, tags: ["right-partner"], name: "Meghan Markle", img: "https://cdn.balkan.app/shared/f16.png"},
                { id: 16, pid: 12, ppid: 14, tags: ["blue"], name: "Prince George of Cambridge", img: "https://cdn.balkan.app/shared/f17.png"},
                { id: 17, pid: 12, ppid: 14, tags: ["blue"], name: "Prince Charlotte of Cambridge", img: "https://cdn.balkan.app/shared/f18.png"},
                { id: 18, pid: 12, ppid: 14, tags: ["blue"], name: "Prince Louis of Cambridge", img: "https://cdn.balkan.app/shared/f19.png"}
            ]
        }
    },
    mounted() {
        this.oc(this.$refs.tree, this.nodes)
    },
    methods: {
        oc: function(domEl, x) {

            this.chart = new OrgChart(domEl, {
                nodes: x,
                nodeMouseClick: OrgChart.action.edit,
                nodeBinding: {
                    field_0: "name",
                    field_1: "title",
                    img_0: "img"
                }
            });
        },
        add() {
            this.nodes.push({
                id: this.nextId(),
                name: this.nev,
                pid: this.kinek,
                tags: this.kije === 1 ? ['partner'] : 'blue',
                img: ''
            })
            this.oc(this.$refs.tree, this.nodes)

        },
        nextId() {
            let nextId = 0;
            this.nodes.forEach(node => {
                if(node.id > nextId) nextId = node.id
            })
            return nextId + 1;
        },
    }
}
</script>

<style scoped>

</style>