<template>

    <div>

        <div id="tree" ref="tree"></div>

        <v-layout>

            <v-flex md12 style="border: 1px solid grey;">

                <v-layout row>

                    <v-flex md3>

                        <v-layout id="add-form" column wrap class="pa-5">

                            <h1 class="title">Családtag felvétele</h1>

                            <v-flex md4>

                                <v-text-field
                                    label="Neve"
                                    v-model="nev"
                                />

                            </v-flex>

                            <v-flex md4>

                                <v-select
                                    v-model="kije"
                                    :items="[
                                      {id: 1, name: 'Párja'},
                                      {id: 2, name: 'Gyereke'}
                                    ]"
                                    label="Kije"
                                    item-text="name"
                                    item-value="id"
                                />

                            </v-flex>

                            <v-flex md4>

                                <v-select
                                    v-model="anyja"
                                    :items="nodes"
                                    item-text="name"
                                    item-value="id"
                                    label="Kinek"
                                />

                            </v-flex>

                            <v-flex md4>

                                <v-select
                                    v-model="apja"
                                    :items="nodes"
                                    item-text="name"
                                    item-value="id"
                                    label="Kinek"
                                />

                            </v-flex>


                            <v-flex md4>

                                <v-select
                                    v-model="felesege"
                                    :items="nodes"
                                    item-text="name"
                                    item-value="id"
                                    label="Kinek"
                                />

                            </v-flex>

                            <v-flex md4>
                                <v-btn @click="add()">Hozzáadás </v-btn>
                            </v-flex>

                        </v-layout>

                    </v-flex>

                    <v-flex md3>

                        <v-layout id="settings-form" column wrap class="pa-5">

                            <h1 class="title">Műveletek</h1>

                            <v-btn text @click="saveSvgToFile()"> Exportálás képként </v-btn>

                            <v-btn text @click="saveToGraphViz()"> Exportálás gráfként </v-btn>


                        </v-layout>

                    </v-flex>

                </v-layout>

            </v-flex>

        </v-layout>

    </div>

</template>

<script>
import OrgChart from "@balkangraph/orgchart.js";

export default {
    name: "FamilyTree",
    data() {
        return {
            nev: null,
            felesege: null,
            ferje: null,
            anyja: null,
            apja: null,
            parja: null,
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
        this.saveToGraphViz();
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
        saveToGraphViz() {

            const sameRankNodes = [];

            const nameByPID = (pid) => {
                return this.nodes.filter(node => node.id === pid)[0].name;
            };

            const nameByPPID = (ppid) => {
                return this.nodes.filter(node => node.id === ppid)[0].name;
            };

            const directedEdge = (fromPoint, toPoint) => {
                return '"' + fromPoint + '"' + ' -> ' + '"' + toPoint + '"' + '\n';
            };

            const undirectedEdge = (fromPoint, toPoint) => {
                return '"' + fromPoint + '"' + ' -> ' + '"' + toPoint + '"' + '[dir=none]' + '\n';
            };

            let graphvizSource = 'digraph G {';
            this.nodes.forEach(node => {

                if(node.pid) {
                    if(node.tags) {
                        if(node.tags.includes('blue')) {
                            graphvizSource += directedEdge(nameByPID(node.pid), node.name);
                        }
                        if(node.tags.includes('left-partner') || node.tags.includes('right-partner') || node.tags.includes('partner')) {
                            graphvizSource += undirectedEdge(node.name, nameByPID(node.pid));
                            sameRankNodes.push('{rank = same;"' + node.name + '";"'+ nameByPID(node.pid)+'"};\n');
                        }
                    } else {
                        graphvizSource += directedEdge(nameByPID(node.pid), node.name);
                    }
                }
                if(node.ppid) {
                    if(node.tags) {
                        if(node.tags.includes('blue')) {
                            graphvizSource += directedEdge(nameByPPID(node.ppid), node.name);
                        }
                        if(node.tags.includes('left-partner') || node.tags.includes('right-partner') || node.tags.includes('partner')) {
                            graphvizSource += undirectedEdge(node.name, nameByPPID(node.ppid));
                            sameRankNodes.push('{rank = same;"' + node.name + '";"'+ nameByPPID(node.pid)+'"};\n');
                        }
                    } else {
                        graphvizSource += directedEdge(nameByPPID(node.ppid), node.name);
                    }
                }
            });
            sameRankNodes.forEach(node => {
                graphvizSource += node;
            })
            graphvizSource += '}';
            console.log(graphvizSource);
            return graphvizSource;
        },
        saveSvgToFile() {
            const svg = document.getElementById("tree");
            const serializer = new XMLSerializer();
            let source = serializer.serializeToString(svg);
            if(!source.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)){
                source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
            }
            if(!source.match(/^<svg[^>]+"http:\/\/www\.w3\.org\/1999\/xlink"/)){
                source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
            }
            source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
            const url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);
            const downloadLink = document.createElement("a");
            downloadLink.href = url;
            downloadLink.download = "fmailytree.svg";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    }
}
</script>

<style scoped>

#tree {
    background: white;
    height: 60vh;
}
#add-form {
    background: #f8f8f8;
    border: 1px solid grey;
}
#settings-form {
    background: #f8f8f8;
    border: 1px solid grey;
    height: 100%;
}
</style>