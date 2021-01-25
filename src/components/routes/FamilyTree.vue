<template>

    <div>

        <div id="tree" ref="tree"></div>

        <v-layout id="menu"  style="background: #d7d6d6">

            <v-flex md12>

                <v-layout v-if="!hidden" row>

                    <v-flex md3>

                        <v-layout id="add-form" column wrap class="pa-5">

                            <h1 class="title">Családtag felvétele</h1>

                            <v-flex md4>

                                <v-text-field
                                    label="Vezetéknév"
                                    v-model="firstName"
                                />

                            </v-flex>

                            <v-flex md4>

                                <v-text-field
                                    label="Keresztnév"
                                    v-model="lastName"
                                />

                            </v-flex>

                            <v-flex md4>

                                <v-select
                                    v-model="kije"
                                    :items="[
                                      {id: 3, name: 'Párja'},
                                      {id: 2, name: 'Gyereke'},
                                      {id: 1, name: 'Szülője'},
                                    ]"
                                    label="Kije"
                                    item-text="name"
                                    item-value="id"
                                />

                            </v-flex>

                            <v-flex md4 v-if="kije === 2">

                                <v-select
                                    v-model="anyja"
                                    :items="nodes"
                                    item-text="name"
                                    item-value="id"
                                    label="Anyja"
                                />

                            </v-flex>

                            <v-flex md4 v-if="kije === 2">

                                <v-select
                                    v-model="apja"
                                    :items="nodes"
                                    item-text="name"
                                    item-value="id"
                                    label="Apja"
                                />

                            </v-flex>


                            <v-flex md4 v-if="kije === 1 || kije === 3">

                                <v-select
                                    v-model="felesege"
                                    :items="nodes"
                                    item-text="name"
                                    item-value="id"
                                    label="Kinek"
                                />

                            </v-flex>


                            <v-flex md4>

                                <v-text-field
                                    label="Kép"
                                    v-model="imageUrl"
                                />

                            </v-flex>


                            <v-flex md4>

                                <v-text-field
                                    label="Születési idő"
                                    v-model="birthDay"
                                />

                            </v-flex>


                            <v-flex md4>

                                <v-text-field
                                    label="Születsi hely"
                                    v-model="birthPlace"
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

                            <!--<v-select
                                v-model="toDelete"
                                :items="nodes"
                                item-text="name"
                                item-value="id"
                                label="Eltávolítandó"
                            /> -->

                        </v-layout>

                    </v-flex>

                    <v-flex md3>
                        <h1 class="title">Kép feltöltése </h1>
                        <div>
                            <img width="150" :src="image" class="uploading-image" />
                            <input type="file" accept="image/jpeg" @change="imageLoaded">
                            <v-btn v-if="image" @click="upload"> Feltöltés </v-btn>
                            <v-btn v-if="image" @click="image = null; imageFile = null;"> Mégse  </v-btn>
                        </div>
                    </v-flex>

                </v-layout>

            </v-flex>

            <v-flex md1 style="cursor:pointer;">

                <v-icon v-if="hidden" @click="hidden = !hidden"> expand_less </v-icon>
                <v-icon v-if="!hidden" @click="hidden = !hidden"> expand_more </v-icon>

            </v-flex>

            <v-flex md1>

                 <span @click="logout" class="logout-text-button">

                  <v-icon > mdi-logout </v-icon>

                  Kijelentkezés

                </span>

            </v-flex>

        </v-layout>

    </div>

</template>

<script>
import OrgChart from "@balkangraph/orgchart.js";
import {relationService} from "@/services/RelationService";
import axios from 'axios';

export const SZULO = 1;
export const GYERMEK = 2;
export const PARTNER = 3;

export default {
    name: "FamilyTree",
    data() {
        return {
            hidden: true,
            image: null,
            imageFile: null,
            toDelete: null,
            firstName: null,
            lastName: null,
            felesege: null,
            imageUrl: null,
            birthDay: null,
            birthPlace: null,
            anyja: null,
            apja: null,
            chart: null,
            kije: null,
            nodes: [
                { firstName: 'Name', lastName: 'NAMME', birthPlace: 'HELY', birthDay: 'IDO',  id: 1, pid: 0, tags: ["blue"], name: "King George VI", img: "https://cdn.balkan.app/shared/f1.png"},
                { firstName: 'Name', lastName: 'NAMME', birthPlace: 'HELY', birthDay: 'IDO',  id: 2, pid: 1, tags: ["partner"], name: "Queen Elizabeth", title: "The Queen Mother", img: "https://cdn.balkan.app/shared/f2.png" },
                { firstName: 'Name', lastName: 'NAMME', birthPlace: 'HELY', birthDay: 'IDO',  id: 3, pid: 1, tags: ["blue"],  ppid: 2, name: "Queen Elizabeth II", img: "https://cdn.balkan.app/shared/f5.png"},
                { firstName: 'Name', lastName: 'NAMME', birthPlace: 'HELY', birthDay: 'IDO',  id: 4, pid: 3, tags: ["left-partner"], name: "Prince Philip", title: "Duke of Edinburgh", img: "https://cdn.balkan.app/shared/f3.png"},
                /*{ id: 5, pid: 1, ppid: 2, name: "Princess Margaret", img: "https://cdn.balkan.app/shared/f6.png"},
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
                { id: 18, pid: 12, ppid: 14, tags: ["blue"], name: "Prince Louis of Cambridge", img: "https://cdn.balkan.app/shared/f19.png"}*/
            ]
        }
    },
    mounted() {

        /*relationService.getRaltionTypes().then(response => {
            console.log(response);
        })*/

        if(localStorage.getItem('id') && this.$store.getters.user == null) {
            this.$store.commit('setUser', {
                email: localStorage.getItem('email'),
                id: localStorage.getItem('id'),
                firstName: localStorage.getItem('firstName'),
                lastName: localStorage.getItem('lastName'),
                birthDay: localStorage.getItem('birthDay'),
                birthPlace: localStorage.getItem('birthPlace'),
                imageUrl: localStorage.getItem('imageUrl'),
            });
        }

        relationService.getUserRelations(this.$store.getters?.user?.id).then(response => {
            console.log(response)
            this.nodes = [];
            this.nodes = response.data;
            this.oc(this.$refs.tree, this.nodes)
        })

    },
    methods: {
        imageLoaded(e) {
            const image = e.target.files[0];
            this.imageFile = image;
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{
                this.image = e.target.result;
            };
        },
        upload() {
            let formData = new FormData();
            formData.append('file', this.imageFile);

            axios.post('/api/api/User/Upload',
                formData, {
                    headers: {
                        'Content-Type': this.imageFile
                    }
                }
            ).then(response => {
                    this.imageUrl = 'http://familytree.eastus2.cloudapp.azure.com/' + response.data.dbPath.replace('\\\\', '/');
                }
            );
        },
        nodeFromRelation(relation, tags, pid, ppid) {
           return {
               id: relation.id,
               tags,
               pid,
               ppid,
               name: relation.firstName + ' ' + relation.lastName,
               birthDayAndPlace: relation.birthDay + ' ' + relation.birthPlace,
               img: relation.imageUrl,
               firstName: relation.firstName,
               lastName: relation.lastName,
               birthDay: relation.birthDay,
               birthPlace: relation.birthPlace,
           }
        },
        logout() {
            this.$store.commit('logOutUser');
            localStorage.clear();
            this.$router.push('/login');
        },
        oc: function(domEl, x) {
            this.chart = new OrgChart(domEl, {
                nodes: x,
                nodeMouseClick: OrgChart.action.edit,
                nodeBinding: {
                    field_0: "name",
                    field_1: "birthDayAndPlace",
                    img_0: "img"
                }
            });
        },
        add() {
            const parentFix = (node) => {
                let newPid = node.pid;
                let newPpid = node.ppid;
                if(newPid && newPpid) {
                    let parentTags = this.nodes.filter(node => {
                        return node.id === newPid;
                    })[0].tags;

                    if(parentTags
                        && (parentTags.includes('partner')
                        || parentTags.includes('left-partner')
                        || parentTags.includes('right-partner'))
                    ) {
                        let tmp = newPid;
                        newPid = newPpid;
                        newPpid = tmp;
                    }
                }
                return {
                    id: node.id,
                    name: node.name,
                    pid: newPid,
                    ppid: newPpid,
                    tags: node.tags,
                    img: node.img,
                }
            };

            let newNode = null;
            if(this.kije !== SZULO) {
                newNode = parentFix({
                    id: this.nextId(),
                    name: this.firstName + ' ' + this.lastName,
                    pid: this.kije === PARTNER ? this.felesege : this.apja,
                    ppid: this.kije === PARTNER ? null : this.anyja,
                    tags: this.kije === PARTNER ? ['partner'] : ['blue'],
                    img: this.imageUrl,
                });

                if(this.kije === PARTNER) {
                    let i = 0;
                    for(i = 0; i < this.nodes.length; i++) {
                        if(this.nodes[i].pid === this.felesege) {
                            this.nodes[i].ppid = newNode.id;
                            break;
                        }
                    }
                }

            } else {
                newNode = {
                    id: this.nextId(),
                    name: this.firstName + ' ' + this.lastName,
                    pid: null,
                    ppid: null,
                    tags: null,
                    img: this.imageUrl,
                };

                let i = 0;
                for(i = 0; i < this.nodes.length; i++) {
                    if(this.nodes[i].id === this.felesege) {
                        if(!this.nodes[i].pid) {
                            this.nodes[i].pid = newNode.id;
                        } else {
                            this.nodes[i].ppid = newNode.id;
                        }
                        break;
                    }
                }
            }

            const relationTypeId = this.kije;

            let firstParent = this.nodes.filter(node => node.id === newNode.pid)[0];
            if(!firstParent) {
                firstParent = this.nodes.filter(node => {
                    return node.id === this.felesege;
                })[0]
            }

            relationService.setUserRelation({
                id: 0,
                secondUser: {
                    id: 0,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    birthDay: new Date(this.birthDay).toISOString(),
                    birthPlace: this.birthPlace,
                    imageUrl: this.imageUrl,
                },
                firstUser: {
                    id: firstParent.id,
                    firstName: firstParent.firstName,
                    lastName: firstParent.lastName,
                    birthDay: firstParent.birthDay,
                    birthPlace: firstParent.birthPlace,
                    imageUrl: firstParent.img,
                },
                relationTypeId: relationTypeId,
            }, this.$store.getters?.user?.id);


            if(relationTypeId !== PARTNER && relationTypeId !== SZULO) {

                const secondParent = this.nodes.filter(node => node.id === newNode.ppid)[0];
                relationService.setUserRelation({
                    id: 0,
                    firstUser: {
                        id: newNode.id,
                        firstName: this.firstName,
                        lastName: this.lastName,
                        birthDay: new Date(this.birthDay).toISOString(),
                        birthPlace: this.birthPlace,
                        imageUrl: this.imageUrl,
                    },
                    secondUser: {
                        id: secondParent.id,
                        firstName: secondParent.firstName,
                        lastName: secondParent.lastName,
                        birthDay: secondParent.birthDay,
                        birthPlace: secondParent.birthPlace,
                        imageUrl: secondParent.img,
                    },
                    relationTypeId: relationTypeId,
                }, this.$store.getters?.user?.id);
            }

            newNode.birthDayAndPlace = this.birthDay + ' ' + this.birthPlace;
            newNode.birthDay = new Date(this.birthDay).toISOString();
            newNode.birthPlace = this.birthPlace;

            this.nodes.push(newNode)

            this.oc(this.$refs.tree, this.nodes)
            this.firstName = '';
            this.lastName = '';
            this.kije = null;
            this.felesege = null;
            this.anyja = null;
            this.apja = null;
            this.imageUrl = '';
        },
        nextId() {
            let nextId = 0;
            this.nodes.forEach(node => {
                if(parseInt(node.id) > parseInt(nextId)) nextId = parseInt(node.id)
            });
            return '' + (parseInt(nextId) + 1);
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

            let link = document.createElement('a');
            const file = new Blob([graphvizSource], {type: 'txt'});
            link.href = URL.createObjectURL(file)
            link.download = 'familytree.txt';
            link.click();
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

#menu {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
}
.visible {
    transition: height 0.3s;
}

.logout-text-button  {
    cursor: pointer;
}

#tree {
    background: white;
    height: 60vh;
}
#add-form {
    background: #d7d6d6;
}
#settings-form {
    background: #d7d6d6;
    height: 100%;
}
.hidden {
    transition: height 0.3s;
    height: 50px;
}
</style>