<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="form">
      <q-card class="q-pa-md" bordered style="width: 1400px; max-width: 200vw">
        <q-card-section>
          <q-form @submit="createDataClientes()">
            <div class="row">
              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="formClientes.nb_cliente"
                  label="Cliente Origen"
                  hint=""
                  class="pcform"
                  @update:model-value="
                    formClientes.nb_cliente =
                      formClientes.nb_cliente.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasNotNull100]"
                >
                  <template v-slot:prepend>
                    <q-icon name="badge" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="formClientes.nb_cliente"
                  label="Cliente Destino"
                  hint=""
                  @update:model-value="
                    formClientes.nb_cliente =
                      formClientes.nb_cliente.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasNotNull100]"
                >
                  <template v-slot:prepend>
                    <q-icon name="badge" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  label="Fecha Emision"
                  hint=""
                  v-model="form.f_val"
                  mask="date"
                  :rules="['date']"
                  class="pcform"
                  lazy-rules
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="form.f_val">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  label="Fecha Envio"
                  hint=""
                  v-model="form.f_val"
                  mask="date"
                  :rules="['date']"
                  lazy-rules
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="form.f_val">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="formClientes.nb_cliente"
                  label="NRO. Guía"
                  hint=""
                  class="pcform"
                  @update:model-value="
                    formClientes.nb_cliente =
                      formClientes.nb_cliente.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasNotNull100]"
                >
                  <template v-slot:prepend>
                    <q-icon name="badge" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="formClientes.nb_cliente"
                  label="Forma de Pago"
                  hint=""
                  class="pcform"
                  @update:model-value="
                    formClientes.nb_cliente =
                      formClientes.nb_cliente.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasNotNull100]"
                >
                  <template v-slot:prepend>
                    <q-icon name="badge" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="formClientes.nb_cliente"
                  label="Pagado En"
                  hint=""
                  @update:model-value="
                    formClientes.nb_cliente =
                      formClientes.nb_cliente.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasNotNull100]"
                >
                  <template v-slot:prepend>
                    <q-icon name="badge" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-5 col-xs-12">
                <q-select
                  outlined
                  v-model="formClientes.nb_cliente"
                  label="Estatus"
                  hint=""
                  class="pcform"
                  @update:model-value="
                    formClientes.nb_cliente =
                      formClientes.nb_cliente.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasNotNull100]"
                >
                  <template v-slot:prepend>
                    <q-icon name="badge" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-5 col-xs-12">
                <q-input
                  outlined
                  v-model="formClientes.nb_cliente"
                  label="Persona que Recibió"
                  hint=""
                  class="pcform"
                  @update:model-value="
                    formClientes.nb_cliente =
                      formClientes.nb_cliente.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasNotNull100]"
                >
                  <template v-slot:prepend>
                    <q-icon name="badge" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-2 col-xs-12" style="margin-bottom: 20px">
                <q-checkbox
                  size="lg"
                  v-model="formClientes.cte_decontado"
                  true-value="1"
                  false-value="0"
                  style="font-size: 13px"
                  label="Check Pagado"
                />
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="formClientes.nb_cliente"
                  label="Identificación"
                  hint=""
                  class="pcform"
                  @update:model-value="
                    formClientes.nb_cliente =
                      formClientes.nb_cliente.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasNotNull100]"
                >
                  <template v-slot:prepend>
                    <q-icon name="badge" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  label="Fecha Entrega"
                  hint=""
                  v-model="form.f_val"
                  mask="date"
                  :rules="['date']"
                  class="pcform"
                  lazy-rules
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="form.f_val">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  label="Hora Entrega"
                  hint=""
                  v-model="form.f_val"
                  mask="time"
                  :rules="['time']"
                  lazy-rules
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time v-model="form.f_val">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12 inputMovil">
                <q-select
                  outlined
                  v-model="formClientes.nb_cliente"
                  label="Agente Entrega"
                  hint=""
                  hide-bottom-space
                  class="pcform"
                  @update:model-value="
                    formClientes.nb_cliente =
                      formClientes.nb_cliente.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasNotNull100]"
                >
                  <template v-slot:prepend>
                    <q-icon name="badge" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-3 col-xs-12 inputMovil">
                <q-input
                  outlined
                  v-model="formClientes.nb_cliente"
                  label="Dias de Entrega"
                  hint=""
                  hide-bottom-space
                  class="pcform"
                  @update:model-value="
                    formClientes.nb_cliente =
                      formClientes.nb_cliente.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasNotNull100]"
                >
                  <template v-slot:prepend>
                    <q-icon name="badge" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-10 inputMovil">
                <q-select
                  outlined
                  v-model="formClientes.nb_cliente"
                  label="Motivo de Retraso en Entrega"
                  hint=""
                  class="pcform"
                  hide-bottom-space
                  @update:model-value="
                    formClientes.nb_cliente =
                      formClientes.nb_cliente.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasNotNull100]"
                >
                  <template v-slot:prepend>
                    <q-icon name="badge" />
                  </template>
                </q-select>
              </div>

              <div
                class="col-md-1 col-xs-1 inputMovilBtn"
                style="text-align: center; align-self: center"
              >
                <q-btn
                  dense
                  color="primary"
                  round
                  href="/conceptosoperacion"
                  target="_blank"
                  padding="sm"
                >
                  <q-icon size="25px" name="book" color="white"> </q-icon>
                  <q-tooltip
                    class="bg-primary"
                    style="max-height: 30px"
                    transition-show="scale"
                    transition-hide="scale"
                    color="primary"
                    >Ver Mas</q-tooltip
                  >
                </q-btn>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="formClientes.nb_cliente"
                  label="Agencia Transito"
                  hint=""
                  class="pcform"
                  @update:model-value="
                    formClientes.nb_cliente =
                      formClientes.nb_cliente.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasNotNull100]"
                >
                  <template v-slot:prepend>
                    <q-icon name="badge" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  label="Fecha Llegada Transito"
                  hint=""
                  v-model="form.f_val"
                  mask="time"
                  class="pcform"
                  :rules="['time']"
                  lazy-rules
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time v-model="form.f_val">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  label="Fecha Salida Transito"
                  hint=""
                  v-model="form.f_val"
                  mask="time"
                  :rules="['time']"
                  lazy-rules
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time v-model="form.f_val">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div class="col-md-12 col-xs-12">
                <q-input
                  outlined
                  v-model="formClientes.nb_cliente"
                  label="Observaciones de Prueba de Entrega"
                  hint=""
                  @update:model-value="
                    formClientes.nb_cliente =
                      formClientes.nb_cliente.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasNotNull100]"
                >
                  <template v-slot:prepend>
                    <q-icon name="badge" />
                  </template>
                </q-input>
              </div>
            </div>

            <div
              class="full-width row justify-center items-center content-center"
              style="margin-bottom: 6px"
            >
              <q-btn
                label="Añadir Prueba de Entrega"
                type="submit"
                color="primary"
                class="col-md-5 col-sm-5 col-xs-12"
                icon="person_add"
              />
              <q-btn
                label="Cerrar"
                color="primary"
                flat
                class="col-md-5 col-sm-5 col-xs-12 btnmovil"
                icon="close"
                v-close-popup
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="formEdit">
      <q-card class="q-pa-md" bordered style="width: 1400px; max-width: 200vw">
        <q-card-section>
          <q-form @submit="putDataClientes()">
            <div class="row">
              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="formClientes.nb_cliente"
                  label="Cliente Origen"
                  hint=""
                  disable
                  class="pcform"
                  @update:model-value="
                    formClientes.nb_cliente =
                      formClientes.nb_cliente.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasNotNull100]"
                >
                  <template v-slot:prepend>
                    <q-icon name="badge" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="formClientes.nb_cliente"
                  label="Cliente Destino"
                  hint=""
                  disable
                  @update:model-value="
                    formClientes.nb_cliente =
                      formClientes.nb_cliente.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasNotNull100]"
                >
                  <template v-slot:prepend>
                    <q-icon name="badge" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  label="Fecha Emision"
                  hint=""
                  v-model="form.f_val"
                  disable
                  mask="date"
                  :rules="['date']"
                  class="pcform"
                  lazy-rules
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="form.f_val">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  label="Fecha Envio"
                  disable
                  hint=""
                  v-model="form.f_val"
                  mask="date"
                  :rules="['date']"
                  lazy-rules
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="form.f_val">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="formClientes.nb_cliente"
                  label="NRO. Guía"
                  hint=""
                  disable
                  class="pcform"
                  @update:model-value="
                    formClientes.nb_cliente =
                      formClientes.nb_cliente.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasNotNull100]"
                >
                  <template v-slot:prepend>
                    <q-icon name="badge" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="formClientes.nb_cliente"
                  label="Forma de Pago"
                  hint=""
                  disable
                  class="pcform"
                  @update:model-value="
                    formClientes.nb_cliente =
                      formClientes.nb_cliente.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasNotNull100]"
                >
                  <template v-slot:prepend>
                    <q-icon name="badge" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="formClientes.nb_cliente"
                  label="Pagado En"
                  hint=""
                  disable
                  @update:model-value="
                    formClientes.nb_cliente =
                      formClientes.nb_cliente.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasNotNull100]"
                >
                  <template v-slot:prepend>
                    <q-icon name="badge" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-5 col-xs-12">
                <q-select
                  outlined
                  v-model="formClientes.nb_cliente"
                  label="Estatus"
                  hint=""
                  class="pcform"
                  @update:model-value="
                    formClientes.nb_cliente =
                      formClientes.nb_cliente.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasNotNull100]"
                >
                  <template v-slot:prepend>
                    <q-icon name="badge" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-5 col-xs-12">
                <q-input
                  outlined
                  v-model="formClientes.nb_cliente"
                  label="Persona que Recibió"
                  hint=""
                  class="pcform"
                  @update:model-value="
                    formClientes.nb_cliente =
                      formClientes.nb_cliente.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasNotNull100]"
                >
                  <template v-slot:prepend>
                    <q-icon name="badge" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-2 col-xs-12" style="margin-bottom: 20px">
                <q-checkbox
                  size="lg"
                  v-model="formClientes.cte_decontado"
                  true-value="1"
                  false-value="0"
                  style="font-size: 13px"
                  label="Check Pagado"
                />
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="formClientes.nb_cliente"
                  label="Identificación"
                  hint=""
                  class="pcform"
                  @update:model-value="
                    formClientes.nb_cliente =
                      formClientes.nb_cliente.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasNotNull100]"
                >
                  <template v-slot:prepend>
                    <q-icon name="badge" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  label="Fecha Entrega"
                  hint=""
                  v-model="form.f_val"
                  mask="date"
                  :rules="['date']"
                  class="pcform"
                  lazy-rules
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="form.f_val">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  label="Hora Entrega"
                  hint=""
                  v-model="form.f_val"
                  mask="time"
                  :rules="['time']"
                  lazy-rules
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time v-model="form.f_val">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12 inputMovil">
                <q-select
                  outlined
                  v-model="formClientes.nb_cliente"
                  label="Agente Entrega"
                  hint=""
                  disable
                  hide-bottom-space
                  class="pcform"
                  @update:model-value="
                    formClientes.nb_cliente =
                      formClientes.nb_cliente.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasNotNull100]"
                >
                  <template v-slot:prepend>
                    <q-icon name="badge" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-3 col-xs-12 inputMovil">
                <q-input
                  outlined
                  v-model="formClientes.nb_cliente"
                  label="Dias de Entrega"
                  hint=""
                  disable
                  hide-bottom-space
                  class="pcform"
                  @update:model-value="
                    formClientes.nb_cliente =
                      formClientes.nb_cliente.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasNotNull100]"
                >
                  <template v-slot:prepend>
                    <q-icon name="badge" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-10 inputMovil">
                <q-select
                  outlined
                  v-model="formClientes.nb_cliente"
                  label="Motivo de Retraso en Entrega"
                  hint=""
                  class="pcform"
                  hide-bottom-space
                  @update:model-value="
                    formClientes.nb_cliente =
                      formClientes.nb_cliente.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasNotNull100]"
                >
                  <template v-slot:prepend>
                    <q-icon name="badge" />
                  </template>
                </q-select>
              </div>

              <div
                class="col-md-1 col-xs-1 inputMovilBtn"
                style="text-align: center; align-self: center"
              >
                <q-btn
                  dense
                  color="primary"
                  round
                  href="/conceptosoperacion"
                  target="_blank"
                  padding="sm"
                >
                  <q-icon size="25px" name="book" color="white"> </q-icon>
                  <q-tooltip
                    class="bg-primary"
                    style="max-height: 30px"
                    transition-show="scale"
                    transition-hide="scale"
                    color="primary"
                    >Ver Mas</q-tooltip
                  >
                </q-btn>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="formClientes.nb_cliente"
                  label="Agencia Transito"
                  hint=""
                  class="pcform"
                  @update:model-value="
                    formClientes.nb_cliente =
                      formClientes.nb_cliente.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasNotNull100]"
                >
                  <template v-slot:prepend>
                    <q-icon name="badge" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  label="Fecha Llegada Transito"
                  hint=""
                  v-model="form.f_val"
                  disable
                  mask="time"
                  class="pcform"
                  :rules="['time']"
                  lazy-rules
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time v-model="form.f_val">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  label="Fecha Salida Transito"
                  hint=""
                  v-model="form.f_val"
                  mask="time"
                  :rules="['time']"
                  lazy-rules
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time v-model="form.f_val">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div class="col-md-12 col-xs-12">
                <q-input
                  outlined
                  v-model="formClientes.nb_cliente"
                  label="Observaciones de Prueba de Entrega"
                  hint=""
                  @update:model-value="
                    formClientes.nb_cliente =
                      formClientes.nb_cliente.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasNotNull100]"
                >
                  <template v-slot:prepend>
                    <q-icon name="badge" />
                  </template>
                </q-input>
              </div>
            </div>

            <div
              class="full-width row justify-center items-center content-center"
              style="margin-bottom: 6px"
            >
              <q-btn
                label="Editar Prueba de Entrega"
                type="submit"
                color="primary"
                class="col-md-5 col-sm-5 col-xs-12"
                icon="person_add"
              />
              <q-btn
                label="Cerrar"
                color="primary"
                flat
                class="col-md-5 col-sm-5 col-xs-12 btnmovil"
                icon="close"
                v-close-popup
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <div class="row justify-center">
      <div class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12">
        <div class="row q-pa-md" style="margin-top: 10px; padding-bottom: 0px">
          <div
            class="row col-md-6 col-xl-6 col-lg-6 col-xs-12 justify-center"
            style="align-self: center; text-align: center"
          >
            <q-card
              class="q-pa-md col-md-12 col-xs-12 col-sm-12 cardMenu"
              bordered
              style="margin-bottom: 10px; padding: 5px"
            >
              <q-card-section class="menuFilter" style="padding-bottom: 0px">
                <div class="row">
                  <div
                    class="col-md-12 col-xs-12"
                    style="
                      align-self: center;
                      text-align: left;
                      margin-top: -30px;
                    "
                  >
                    <h4
                      style="font-size: 16px; margin-bottom: 5px"
                      class="text-secondary"
                    >
                      <strong>Fecha de Envio</strong>
                    </h4>
                  </div>
                  <div class="col-md-6 col-xs-12">
                    <q-input
                      outlined
                      label="Desde"
                      hint=""
                      v-model="form.f_val"
                      dense
                      mask="date"
                      :rules="['date']"
                      class="pcform"
                      lazy-rules
                    >
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date v-model="form.f_val">
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  label="Close"
                                  color="primary"
                                  flat
                                />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>

                  <div class="col-md-6 col-xs-12">
                    <q-input
                      outlined
                      label="Hasta"
                      hint=""
                      v-model="form.f_val"
                      dense
                      mask="date"
                      :rules="['date']"
                      lazy-rules
                    >
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date v-model="form.f_val">
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  label="Close"
                                  color="primary"
                                  flat
                                />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>

          <div
            class="row col-md-6 col-xs-12 col-xl-6 col-lg-6 justify-center"
            style="align-self: center; text-align: center"
          >
            <q-card
              class="q-pa-md col-md-12 col-xs-12 col-sm-12"
              bordered
              style="margin-bottom: 10px; padding: 5px"
            >
              <q-card-section class="menuFilter" style="padding-bottom: 0px">
                <div class="row">
                  <div
                    class="col-md-12 col-xs-12"
                    style="
                      align-self: center;
                      text-align: left;
                      margin-top: -30px;
                    "
                  >
                    <h4
                      style="font-size: 16px; margin-bottom: 5px"
                      class="text-secondary"
                    >
                      <strong>Datos de Guia</strong>
                    </h4>
                  </div>
                  <div class="col-md-6 col-xs-12">
                    <q-input
                      outlined
                      v-model="formClientes.cod_agente"
                      label="NRO. Guia"
                      dense
                      hint=""
                      class="pcform"
                      :rules="[reglasInputs]"
                      lazy-rules
                    >
                      <template v-slot:prepend>
                        <q-icon name="face" />
                      </template>
                    </q-input>
                  </div>

                  <div class="col-md-6 col-xs-12">
                    <q-input
                      outlined
                      v-model="formClientes.cod_agente"
                      label="Estatus"
                      hint=""
                      dense
                      :rules="[reglasInputs]"
                      lazy-rules
                    >
                      <template v-slot:prepend>
                        <q-icon name="face" />
                      </template>
                    </q-input>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>

          <div
            class="row col-md-6 col-xs-12 col-xl-6 col-lg-6 menuHeader justify-center"
            style="align-self: center; text-align: center"
          >
            <q-card
              bordered
              style="margin-bottom: 20px; padding: 0px"
              class="q-pa-md row col-md-12 col-xs-12 col-xl-12 col-lg-12 col-sm-12 cardMenu"
            >
              <q-card-section
                class="row col-md-12 col-xs-12 menuFilter2"
                style="padding-bottom: 0px"
              >
                <div
                  class="col-md-4 col-xs-12 col-sm-4 titleMenu"
                  style="align-self: center; text-align: center"
                >
                  <p
                    style="
                      font-size: 16px;
                      align-self: center;
                      text-align: center;
                      margin-bottom: 0px;
                      margin-top: 4px;
                    "
                    class="text-secondary"
                  >
                    <strong>TIPO DE GUIA</strong>
                  </p>
                </div>

                <div
                  class="col-md-4 col-xs-6 col-sm-4 justify-center"
                  style="
                    margin-top: 7px;
                    align-self: center;
                    text-align: center;
                  "
                  id="select"
                >
                  <q-field
                    hide-bottom-space
                    borderless
                    @update:model-value="
                      this.axiosConfig.headers.tipo_guia_carga =
                        this.selectedGuiaCarga.value;
                      getData(`/cguias`, 'setData', 'datos');
                    "
                    dense
                    class="pcform"
                    v-model="selectedGuiaCarga"
                  >
                    <template v-slot:control>
                      <q-checkbox
                        size="md"
                        v-model="selectedGuiaCarga"
                        true-value="1"
                        false-value="0"
                        style="font-size: 13px"
                        label="Guia de Carga"
                      />
                    </template>
                  </q-field>
                </div>

                <div
                  class="col-md-4 col-xs-6 col-sm-4 justify-center"
                  style="
                    margin-top: 7px;
                    align-self: center;
                    text-align: center;
                  "
                  id="select"
                >
                  <q-field
                    hide-bottom-space
                    borderless
                    dense
                    @update:model-value="
                      this.axiosConfig.headers.tipo_guia_factura =
                        this.selectedGuiaFactura.value;
                      getData(`/cguias`, 'setData', 'datos');
                    "
                    v-model="selectedGuiaFactura"
                  >
                    <template v-slot:control>
                      <q-checkbox
                        size="md"
                        v-model="selectedGuiaFactura"
                        true-value="1"
                        false-value="0"
                        style="font-size: 13px"
                        label="Guia de Factura"
                      />
                    </template>
                  </q-field>
                </div>

                <div
                  class="col-md-4 col-xs-12 col-sm-4"
                  style="align-self: center; text-align: center"
                >
                  <p
                    style="
                      font-size: 16px;
                      align-self: center;
                      text-align: center;
                      margin-bottom: 0px;
                      margin-top: 4px;
                    "
                    class="text-secondary checkboxTitle"
                  >
                    <strong>EN TRANSITO</strong>
                  </p>
                </div>

                <div
                  class="col-md-4 col-xs-6 col-sm-4"
                  style="
                    margin-bottom: 7px;
                    margin-top: 7px;
                    align-self: center;
                    text-align: center;
                  "
                  id="select"
                >
                  <q-field
                    hide-bottom-space
                    borderless
                    @update:model-value="
                      this.axiosConfig.headers.tipo_guia_carga =
                        this.selectedGuiaCarga.value;
                      getData(`/cguias`, 'setData', 'datos');
                    "
                    dense
                    class="pcform"
                    v-model="selectedGuiaCarga"
                  >
                    <template v-slot:control>
                      <q-checkbox
                        size="md"
                        v-model="selectedGuiaCarga"
                        true-value="1"
                        false-value="0"
                        style="font-size: 13px"
                        label="SI"
                      />
                    </template>
                  </q-field>
                </div>

                <div
                  class="col-md-4 col-xs-6 col-sm-4"
                  style="
                    margin-bottom: 7px;
                    margin-top: 7px;
                    align-self: center;
                    text-align: center;
                  "
                  id="select"
                >
                  <q-field
                    hide-bottom-space
                    borderless
                    dense
                    @update:model-value="
                      this.axiosConfig.headers.tipo_guia_factura =
                        this.selectedGuiaFactura.value;
                      getData(`/cguias`, 'setData', 'datos');
                    "
                    v-model="selectedGuiaFactura"
                  >
                    <template v-slot:control>
                      <q-checkbox
                        size="md"
                        v-model="selectedGuiaFactura"
                        true-value="1"
                        false-value="0"
                        style="font-size: 13px"
                        label="NO"
                      />
                    </template>
                  </q-field>
                </div>
              </q-card-section>
            </q-card>
          </div>

          <div
            class="row col-md-6 col-xs-12 col-xl-6 col-lg-6 menuHeader justify-center"
            style="align-self: center; text-align: center"
          >
            <q-card
              bordered
              style="padding: 5px; margin-bottom: 20px"
              class="q-pa-md row col-md-12 col-xs-12 col-xl-12 col-lg-12 col-sm-12"
            >
              <q-card-section
                class="row col-md-12 col-xs-12 menuFilter2"
                style="padding-bottom: 0px; padding-top: 0px"
              >
                <div
                  class="col-md-3 col-xs-12 SelectAgenciaCliente pcform"
                  style="align-self: center; text-align: center"
                >
                  <p
                    style="
                      font-size: 16px;
                      align-self: center;
                      text-align: center;
                      margin-bottom: 0px;
                    "
                    class="text-secondary"
                  >
                    <strong>AGENCIAS</strong>
                  </p>
                </div>

                <div
                  class="col-md-4 col-xs-12 col-sm-6"
                  style="
                    margin-top: 7px;
                    margin-bottom: 10px;
                    align-self: center;
                    text-align: center;
                  "
                  id="select"
                >
                  <q-select
                    rounded
                    transition-show="flip-up"
                    transition-hide="flip-down"
                    :options="paises"
                    dense
                    class="selectmovil"
                    option-label="desc_pais"
                    option-value="id"
                    v-model="selectedPais"
                    outlined
                    standout
                    label="Origen"
                    @update:model-value="
                      this.axiosConfig.headers.pais = this.selectedPais.id;
                      getDataEstados(`/estados`, 'setDataEstados', 'estados');
                    "
                  >
                    <template v-slot:prepend>
                      <q-icon name="search" />
                    </template>
                  </q-select>
                </div>

                <div
                  class="col-md-4 col-xs-12 col-sm-6 SelectAgenciaCliente"
                  style="
                    margin-top: 7px;
                    margin-bottom: 10px;
                    align-self: center;
                    text-align: center;
                  "
                  id="select"
                >
                  <q-select
                    rounded
                    transition-show="flip-up"
                    transition-hide="flip-down"
                    :options="paises"
                    dense
                    option-label="desc_pais"
                    option-value="id"
                    v-model="selectedPais"
                    outlined
                    standout
                    label="Destino"
                    @update:model-value="
                      this.axiosConfig.headers.pais = this.selectedPais.id;
                      getDataEstados(`/estados`, 'setDataEstados', 'estados');
                    "
                  >
                    <template v-slot:prepend>
                      <q-icon name="search" />
                    </template>
                  </q-select>
                </div>

                <div
                  class="col-md-3 col-xs-12 SelectAgenciaCliente pcform"
                  style="align-self: center; text-align: center"
                >
                  <p
                    style="
                      font-size: 16px;
                      align-self: center;
                      text-align: center;
                      margin-bottom: 0px;
                      padding-right: 3px;
                    "
                    class="text-secondary"
                  >
                    <strong>CLIENTES</strong>
                  </p>
                </div>

                <div
                  class="col-md-4 col-xs-12 col-sm-6"
                  style="
                    margin-top: 7px;
                    margin-bottom: 10px;
                    align-self: center;
                    text-align: center;
                  "
                  id="select"
                >
                  <q-select
                    rounded
                    transition-show="flip-up"
                    transition-hide="flip-down"
                    :options="paises"
                    dense
                    option-label="desc_pais"
                    class="selectmovil"
                    option-value="id"
                    v-model="selectedPais"
                    outlined
                    standout
                    label="Origen"
                    @update:model-value="
                      this.axiosConfig.headers.pais = this.selectedPais.id;
                      getDataEstados(`/estados`, 'setDataEstados', 'estados');
                    "
                  >
                    <template v-slot:prepend>
                      <q-icon name="search" />
                    </template>
                  </q-select>
                </div>

                <div
                  class="col-md-4 col-xs-12 col-sm-6"
                  style="
                    margin-top: 7px;
                    margin-bottom: 10px;
                    align-self: center;
                    text-align: center;
                  "
                  id="select"
                >
                  <q-select
                    rounded
                    transition-show="flip-up"
                    transition-hide="flip-down"
                    :options="paises"
                    option-label="desc_pais"
                    option-value="id"
                    dense
                    v-model="selectedPais"
                    outlined
                    standout
                    label="Destino"
                    @update:model-value="
                      this.axiosConfig.headers.pais = this.selectedPais.id;
                      getDataEstados(`/estados`, 'setDataEstados', 'estados');
                    "
                  >
                    <template v-slot:prepend>
                      <q-icon name="search" />
                    </template>
                  </q-select>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>

        <div style="margin-top: 20px">
          <div class="q-gutter-y-md">
            <div bordered flat class="my-card row">
              <q-table
                :rows="clientes"
                dense
                :columns="columnsClientes"
                binary-state-sort
                slice
                :separator="separator"
                row-key="action"
                :loading="loading"
                class="my-sticky-header-column-table"
                :filter="filter"
                style="width: 100%"
                :grid="$q.screen.xs"
                v-model:pagination="pagination"
              >
                <template v-slot:loading>
                  <q-inner-loading showing color="primary" />
                </template>

                <template v-slot:body-cell-action="props">
                  <q-td :props="props">
                    <q-btn
                      dense
                      round
                      flat
                      color="primary"
                      icon="save"
                      :disabled="this.disabledDelete"
                      @click="selected = props.row.id"
                      @click.capture="permisosDelete = true"
                    ></q-btn>
                  </q-td>
                </template>

                <template v-slot:body-cell-check="props">
                  <q-td :props="props">
                    <q-checkbox
                      size="lg"
                      v-model="props.row.cte_decontado"
                      true-value="1"
                      false-value="0"
                      style="font-size: 13px"
                    />
                  </q-td>
                </template>

                <template v-slot:body-cell-estatus_select="props">
                  <q-td :props="props">
                    <q-select
                      outlined
                      v-model="props.row.rif_cedula"
                      :options="estatus"
                    >
                    </q-select>
                  </q-td>
                </template>

                <template v-slot:body-cell-persona_recibio_input="props">
                  <q-td :props="props">
                    <q-input
                      outlined
                      v-model="props.row.nb_cliente"
                      :input-style="{
                        width: `${props.row.nb_cliente.length / 2 + 2}em`,
                        minWidth: '30px',
                      }"
                    >
                    </q-input>
                  </q-td>
                </template>

                <template v-slot:body-cell-ci_input="props">
                  <q-td :props="props">
                    <q-input
                      outlined
                      v-model="props.row.rif_cedula"
                      :input-style="{
                        width: `${props.row.rif_cedula.length / 2 + 2}em`,
                        minWidth: '30px',
                      }"
                      @update:model-value="
                        getData(props.row.id, 'putDatoSelect');
                        this.formEdit.estatus_lote = props.row.rif_cedula.value;
                      "
                    >
                    </q-input>
                  </q-td>
                </template>

                <template v-slot:body-cell-fecha_entrega_input="props">
                  <q-td :props="props">
                    <q-input
                      outlined
                      hint=""
                      style="padding-bottom: 0px"
                      :input-style="{ minWidth: '100px' }"
                      v-model="formClientes.nit"
                      mask="date"
                      :rules="['date']"
                      lazy-rules
                    >
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date v-model="formClientes.nit">
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  label="Close"
                                  color="primary"
                                  flat
                                />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </q-td>
                </template>

                <template v-slot:body-cell-agente_select="props">
                  <q-td :props="props">
                    <q-select
                      outlined
                      v-model="props.row.persona_contacto"
                      :options="estatus"
                    >
                    </q-select>
                  </q-td>
                </template>

                <template v-slot:body-cell-dias_entrega_input="props">
                  <q-td :props="props">
                    <q-input
                      outlined
                      :input-style="{
                        width: `${props.row.id.length / 2 + 2}em`,
                        minWidth: '10px',
                      }"
                      v-model="props.row.id"
                      :options="estatus"
                    >
                    </q-input>
                  </q-td>
                </template>

                <template v-slot:body-cell-motivo_retraso_select="props">
                  <q-td :props="props">
                    <q-select
                      outlined
                      v-model="props.row.dir_fiscal"
                      :options="estatus"
                    >
                    </q-select>
                  </q-td>
                </template>

                <template v-slot:body-cell-agencia_trafico_select="props">
                  <q-td :props="props">
                    <q-select
                      outlined
                      v-model="props.row.dir_correo"
                      :options="estatus"
                    >
                    </q-select>
                  </q-td>
                </template>

                <template v-slot:body-cell-fecha_llega_transito_input="props">
                  <q-td :props="props">
                    <q-input
                      outlined
                      hint=""
                      style="padding-bottom: 0px"
                      :input-style="{ minWidth: '100px' }"
                      v-model="formClientes.nit"
                      mask="date"
                      :rules="['date']"
                      lazy-rules
                    >
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date v-model="formClientes.nit">
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  label="Close"
                                  color="primary"
                                  flat
                                />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </q-td>
                </template>

                <template v-slot:body-cell-fecha_sale_transito_input="props">
                  <q-td :props="props">
                    <q-input
                      outlined
                      hint=""
                      style="padding-bottom: 0px"
                      :input-style="{ minWidth: '100px' }"
                      v-model="formClientes.nit"
                      mask="date"
                      :rules="['date']"
                      lazy-rules
                    >
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date v-model="formClientes.nit">
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  label="Close"
                                  color="primary"
                                  flat
                                />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </q-td>
                </template>

                <template v-slot:body-cell-observacion_input="props">
                  <q-td :props="props">
                    <q-input
                      outlined
                      :input-style="{
                        width: `${props.row.razon_social.length / 2 + 2}em`,
                        minWidth: '100px',
                      }"
                      v-model="props.row.razon_social"
                      :options="estatus"
                    >
                    </q-input>
                  </q-td>
                </template>

                <template v-slot:item="props">
                  <div
                    class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
                    :style="props.selected ? 'transform: scale(0.95);' : ''"
                  >
                    <q-card :class="props.selected ? 'bg-grey-2' : ''">
                      <q-list dense>
                        <q-item v-for="col in props.cols" :key="col.name">
                          <q-item-section>
                            <q-item-label>{{ col.label }}</q-item-label>
                          </q-item-section>

                          <q-item-section side style="padding-left: 0px">
                            <q-chip
                              v-if="col.name === 'checke'"
                              :color="
                                props.row.check == 'Active'
                                  ? 'green'
                                  : props.row.check == 'Disable'
                                  ? 'red'
                                  : 'grey'
                              "
                              text-color="white"
                              dense
                              class="text-weight-bolder"
                              square
                              >{{ col.value }}</q-chip
                            >
                            <q-btn
                              v-else-if="col.name === 'action'"
                              dense
                              round
                              flat
                              color="primary"
                              icon="save"
                              :disabled="this.disabledDelete"
                              @click="selected = props.row.id"
                              @click.capture="permisosDelete = true"
                            ></q-btn>
                            <q-item-label
                              v-else
                              caption
                              :class="col.classes ? col.classes : ''"
                              >{{ col.value }}</q-item-label
                            >
                          </q-item-section>

                          <q-item-section side style="padding-left: 0px">
                            <q-chip
                              v-if="col.name === 'checke'"
                              :color="
                                props.row.check == 'Active'
                                  ? 'green'
                                  : props.row.check == 'Disable'
                                  ? 'red'
                                  : 'grey'
                              "
                              text-color="white"
                              dense
                              class="text-weight-bolder"
                              square
                              >{{ col.value }}</q-chip
                            >
                            <q-checkbox
                              v-else-if="col.name === 'check'"
                              size="lg"
                              v-model="props.row.cte_decontado"
                              true-value="1"
                              false-value="0"
                              style="font-size: 13px"
                            />
                            <q-item-label
                              v-else
                              caption
                              :class="col.classes ? col.classes : ''"
                              >{{ col.value }}</q-item-label
                            >
                          </q-item-section>

                          <q-item-section side style="padding-left: 0px">
                            <q-chip
                              v-if="col.name === 'checke'"
                              :color="
                                props.row.status == 'Active'
                                  ? 'green'
                                  : props.row.status == 'Disable'
                                  ? 'red'
                                  : 'grey'
                              "
                              text-color="white"
                              dense
                              class="text-weight-bolder"
                              square
                              >{{ col.value }}</q-chip
                            >
                            <q-select
                              v-else-if="col.name === 'estatus_select'"
                              outlined
                              autogrow
                              v-model="props.row.estatus_desc"
                              :options="estatus"
                              label="Estatus"
                              @update:model-value="
                                getData(props.row.id, 'putDatoSelect');
                                this.formEdit.estatus_lote =
                                  props.row.estatus_desc.value;
                              "
                            >
                            </q-select>
                          </q-item-section>

                          <q-item-section side style="padding-left: 0px">
                            <q-chip
                              v-if="col.name === 'checke'"
                              :color="
                                props.row.status == 'Active'
                                  ? 'green'
                                  : props.row.status == 'Disable'
                                  ? 'red'
                                  : 'grey'
                              "
                              text-color="white"
                              dense
                              class="text-weight-bolder"
                              square
                              >{{ col.value }}</q-chip
                            >
                            <q-input
                              v-else-if="col.name === 'persona_recibio_input'"
                              outlined
                              v-model="props.row.estatus_desc"
                              :options="estatus"
                              label="Persona que Recibio"
                              @update:model-value="
                                getData(props.row.id, 'putDatoSelect');
                                this.formEdit.estatus_lote =
                                  props.row.estatus_desc.value;
                              "
                            >
                            </q-input>
                          </q-item-section>

                          <q-item-section side style="padding-left: 0px">
                            <q-chip
                              v-if="col.name === 'checke'"
                              :color="
                                props.row.status == 'Active'
                                  ? 'green'
                                  : props.row.status == 'Disable'
                                  ? 'red'
                                  : 'grey'
                              "
                              text-color="white"
                              dense
                              class="text-weight-bolder"
                              square
                              >{{ col.value }}</q-chip
                            >
                            <q-input
                              v-else-if="col.name === 'ci_input'"
                              outlined
                              v-model="props.row.estatus_desc"
                              :options="estatus"
                              label="C.I."
                              @update:model-value="
                                getData(props.row.id, 'putDatoSelect');
                                this.formEdit.estatus_lote =
                                  props.row.estatus_desc.value;
                              "
                            >
                            </q-input>
                          </q-item-section>

                          <q-item-section side style="padding-left: 0px">
                            <q-chip
                              v-if="col.name === 'checke'"
                              :color="
                                props.row.status == 'Active'
                                  ? 'green'
                                  : props.row.status == 'Disable'
                                  ? 'red'
                                  : 'grey'
                              "
                              text-color="white"
                              dense
                              class="text-weight-bolder"
                              square
                              >{{ col.value }}</q-chip
                            >
                            <q-input
                              v-else-if="col.name === 'fecha_entrega_input'"
                              outlined
                              label="Fecha Entrega"
                              hint=""
                              style="padding-bottom: 0px"
                              v-model="form.fecha_ini_val"
                              mask="date"
                              :rules="['date']"
                              class="pcform"
                              lazy-rules
                            >
                              <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                  <q-popup-proxy
                                    cover
                                    transition-show="scale"
                                    transition-hide="scale"
                                  >
                                    <q-date v-model="form.fecha_ini_val">
                                      <div class="row items-center justify-end">
                                        <q-btn
                                          v-close-popup
                                          label="Close"
                                          color="primary"
                                          flat
                                        />
                                      </div>
                                    </q-date>
                                  </q-popup-proxy>
                                </q-icon>
                              </template>
                            </q-input>
                          </q-item-section>

                          <q-item-section side style="padding-left: 0px">
                            <q-chip
                              v-if="col.name === 'checke'"
                              :color="
                                props.row.status == 'Active'
                                  ? 'green'
                                  : props.row.status == 'Disable'
                                  ? 'red'
                                  : 'grey'
                              "
                              text-color="white"
                              dense
                              class="text-weight-bolder"
                              square
                              >{{ col.value }}</q-chip
                            >
                            <q-select
                              v-else-if="col.name === 'agente_select'"
                              outlined
                              autogrow
                              v-model="props.row.estatus_desc"
                              :options="estatus"
                              label="Agente Entrega"
                              @update:model-value="
                                getData(props.row.id, 'putDatoSelect');
                                this.formEdit.estatus_lote =
                                  props.row.estatus_desc.value;
                              "
                            >
                            </q-select>
                          </q-item-section>

                          <q-item-section side style="padding-left: 0px">
                            <q-chip
                              v-if="col.name === 'checke'"
                              :color="
                                props.row.status == 'Active'
                                  ? 'green'
                                  : props.row.status == 'Disable'
                                  ? 'red'
                                  : 'grey'
                              "
                              text-color="white"
                              dense
                              class="text-weight-bolder"
                              square
                              >{{ col.value }}</q-chip
                            >
                            <q-input
                              v-else-if="col.name === 'dias_entrega_input'"
                              outlined
                              v-model="props.row.estatus_desc"
                              :options="estatus"
                              label="Dias de Entrega"
                              @update:model-value="
                                getData(props.row.id, 'putDatoSelect');
                                this.formEdit.estatus_lote =
                                  props.row.estatus_desc.value;
                              "
                            >
                            </q-input>
                          </q-item-section>

                          <q-item-section side style="padding-left: 0px">
                            <q-chip
                              v-if="col.name === 'checke'"
                              :color="
                                props.row.status == 'Active'
                                  ? 'green'
                                  : props.row.status == 'Disable'
                                  ? 'red'
                                  : 'grey'
                              "
                              text-color="white"
                              dense
                              class="text-weight-bolder"
                              square
                              >{{ col.value }}</q-chip
                            >
                            <q-select
                              autogrow
                              v-else-if="col.name === 'motivo_retraso_select'"
                              outlined
                              v-model="props.row.estatus_desc"
                              :options="estatus"
                              label="Motivo de Retraso"
                              @update:model-value="
                                getData(props.row.id, 'putDatoSelect');
                                this.formEdit.estatus_lote =
                                  props.row.estatus_desc.value;
                              "
                            >
                            </q-select>
                          </q-item-section>

                          <q-item-section side style="padding-left: 0px">
                            <q-chip
                              v-if="col.name === 'checke'"
                              :color="
                                props.row.status == 'Active'
                                  ? 'green'
                                  : props.row.status == 'Disable'
                                  ? 'red'
                                  : 'grey'
                              "
                              text-color="white"
                              dense
                              class="text-weight-bolder"
                              square
                              >{{ col.value }}</q-chip
                            >
                            <q-select
                              v-else-if="col.name === 'agencia_trafico_select'"
                              outlined
                              autogrow
                              v-model="props.row.estatus_desc"
                              :options="estatus"
                              label="Agencia Transito"
                              @update:model-value="
                                getData(props.row.id, 'putDatoSelect');
                                this.formEdit.estatus_lote =
                                  props.row.estatus_desc.value;
                              "
                            >
                            </q-select>
                          </q-item-section>

                          <q-item-section side style="padding-left: 0px">
                            <q-chip
                              v-if="col.name === 'checke'"
                              :color="
                                props.row.status == 'Active'
                                  ? 'green'
                                  : props.row.status == 'Disable'
                                  ? 'red'
                                  : 'grey'
                              "
                              text-color="white"
                              dense
                              class="text-weight-bolder"
                              square
                              >{{ col.value }}</q-chip
                            >
                            <q-input
                              v-else-if="
                                col.name === 'fecha_llega_transito_input'
                              "
                              outlined
                              label="Llega a Transito"
                              hint=""
                              v-model="form.fecha_ini_val"
                              style="padding-bottom: 0px"
                              mask="date"
                              :rules="['date']"
                              class="pcform"
                              lazy-rules
                            >
                              <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                  <q-popup-proxy
                                    cover
                                    transition-show="scale"
                                    transition-hide="scale"
                                  >
                                    <q-date v-model="form.fecha_ini_val">
                                      <div class="row items-center justify-end">
                                        <q-btn
                                          v-close-popup
                                          label="Close"
                                          color="primary"
                                          flat
                                        />
                                      </div>
                                    </q-date>
                                  </q-popup-proxy>
                                </q-icon>
                              </template>
                            </q-input>
                          </q-item-section>

                          <q-item-section side style="padding-left: 0px">
                            <q-chip
                              v-if="col.name === 'checke'"
                              :color="
                                props.row.status == 'Active'
                                  ? 'green'
                                  : props.row.status == 'Disable'
                                  ? 'red'
                                  : 'grey'
                              "
                              text-color="white"
                              dense
                              class="text-weight-bolder"
                              square
                              >{{ col.value }}</q-chip
                            >
                            <q-input
                              v-else-if="
                                col.name === 'fecha_sale_transito_input'
                              "
                              outlined
                              label="Llega de Transito"
                              style="padding-bottom: 0px"
                              hint=""
                              v-model="form.fecha_ini_val"
                              mask="date"
                              :rules="['date']"
                              class="pcform"
                              lazy-rules
                            >
                              <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                  <q-popup-proxy
                                    cover
                                    transition-show="scale"
                                    transition-hide="scale"
                                  >
                                    <q-date v-model="form.fecha_ini_val">
                                      <div class="row items-center justify-end">
                                        <q-btn
                                          v-close-popup
                                          label="Close"
                                          color="primary"
                                          flat
                                        />
                                      </div>
                                    </q-date>
                                  </q-popup-proxy>
                                </q-icon>
                              </template>
                            </q-input>
                          </q-item-section>

                          <q-item-section
                            side
                            style="padding-left: 0px; padding-bottom: 10px"
                          >
                            <q-chip
                              v-if="col.name === 'checke'"
                              :color="
                                props.row.status == 'Active'
                                  ? 'green'
                                  : props.row.status == 'Disable'
                                  ? 'red'
                                  : 'grey'
                              "
                              text-color="white"
                              dense
                              class="text-weight-bolder"
                              square
                              >{{ col.value }}</q-chip
                            >
                            <q-input
                              v-else-if="col.name === 'observacion_input'"
                              outlined
                              v-model="props.row.estatus_desc"
                              :options="estatus"
                              label="Observacion"
                              @update:model-value="
                                getData(props.row.id, 'putDatoSelect');
                                this.formEdit.estatus_lote =
                                  props.row.estatus_desc.value;
                              "
                            >
                            </q-input>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-card>
                  </div>
                </template>
              </q-table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <q-dialog v-model="clientesDelete">
      <q-card style="width: 700px">
        <q-card-section>
          <div class="text-h5" style="font-size: 18px">
            ¿Estas seguro que quieres eliminar este elemento?
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn
            flat
            label="Aceptar"
            color="primary"
            v-close-popup
            @click="deleteData(selected)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <methods
      ref="methods"
      @get-data="
        this.axiosConfig.headers.agencia = this.selectedAgencia.id;
        getData(`/clientes`, 'setDataClientes', 'clientes');
      "
      @reset-Loading="resetLoading"
      @set-Data-Clientes="setDataClientes"
      @set-Data-Edit="setDataEdit"
      @set-Data-Iniciar="setDataIniciar"
      @set-Data-Localidades="setDataLocalidades"
      @set-Data-Municipios="setDataMunicipios"
      @set-Data-Parroquias="setDataParroquias"
      @set-Data-Estados="setDataEstados"
      @set-Data-Ciudades="setDataCiudades"
      @set-Data-Paises="setDataPaises"
      @set-Data-Agentes="setDataAgentes"
    ></methods>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import methodsVue from "src/components/methods.vue";

export default {
  components: { methods: methodsVue },
  name: "Clientes",
  data() {
    return {
      columnsClientes: [
        {
          name: "action",
          label: "Guardar",
          field: "action",
          align: "center",
          required: true,
          sortable: true,
        },
        {
          name: "nb_cliente",
          label: "Cliente Origen",
          field: "nb_cliente",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "rif_cedula",
          label: "Cliente Destino",
          field: "rif_cedula",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "activo_desc",
          label: "Fecha Emision",
          field: "activo_desc",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "cte_decontado",
          label: "Fecha Envio",
          field: "cte_decontado",
          align: "center",
          sortable: true,
          required: true,
        },
        {
          name: "cte_decontado",
          label: "NRO. Guia",
          field: "cte_decontado",
          align: "center",
          sortable: true,
          required: true,
        },
        {
          name: "cte_decontado",
          label: "Forma Pago",
          field: "cte_decontado",
          align: "center",
          sortable: true,
          required: true,
        },
        {
          name: "cte_decontado",
          label: "Pagado En",
          field: "cte_decontado",
          align: "center",
          sortable: true,
          required: true,
        },
        {
          name: "check",
          label: "Pagado",
          align: "center",
          sortable: true,
          required: true,
        },
        {
          name: "estatus_select",
          label: "Estatus",
          align: "center",
          sortable: true,
          required: true,
        },
        {
          name: "persona_recibio_input",
          label: "Persona que Recibió",
          align: "center",
          sortable: true,
          required: true,
        },
        {
          name: "ci_input",
          label: "C.I.",
          align: "center",
          sortable: true,
          required: true,
        },
        {
          name: "fecha_entrega_input",
          label: "Fecha Entrega",
          align: "center",
          sortable: true,
          required: true,
        },
        {
          name: "agente_select",
          label: "Agente Entrega",
          align: "center",
          sortable: true,
          required: true,
        },
        {
          name: "dias_entrega_input",
          label: "Dias de Entrega",
          align: "center",
          sortable: true,
          required: true,
        },
        {
          name: "motivo_retraso_select",
          label: "Motivo de Retraso en Entrega",
          align: "center",
          sortable: true,
          required: true,
        },
        {
          name: "agencia_trafico_select",
          label: "Agencia Transito",
          align: "center",
          sortable: true,
          required: true,
        },
        {
          name: "fecha_llega_transito_input",
          label: "Fecha Llega Transito",
          align: "center",
          sortable: true,
          required: true,
        },
        {
          name: "fecha_sale_transito_input",
          label: "Fecha Sale Transito",
          align: "center",
          sortable: true,
          required: true,
        },
        {
          name: "observacion_input",
          label: "Observacion",
          align: "center",
          sortable: true,
          required: true,
        },
      ],
      columnsConceptos: [
        {
          name: "id",
          label: "Codigo",
          field: "id",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "nb_cliente",
          label: "Nombre",
          field: "nb_cliente",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "rif_cedula",
          label: "RIF",
          field: "rif_cedula",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "activo_desc",
          label: "Estatus",
          field: "activo_desc",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "cte_decontado",
          label: "Cliente Particular",
          field: "cte_decontado",
          align: "center",
          sortable: true,
        },
      ],
      formClientes: {
        nb_cliente: "",
        rif_cedula: "",
        nit: "",
        dir_correo: "",
        dir_fiscal: "",
        email: "",
        tlf_cliente: "",
        fax: "",
        razon_social: "",
        tipo_persona: "",
        modalidad_pago: "",
        persona_contacto: "",
        observacion: "",
        cte_decontado: "",
        tipo_persona_new: "",
        flag_activo: "",
        cod_agencia: [],
        cod_ciudad: [],
        cod_agente: [],
        cod_municipio: [],
        cod_parroquia: [],
        cod_localidad: [],
      },
      formEditClientes: {
        descripcion: "",
        nb_cliente: "",
        rif_cedula: "",
        nit: "",
        dir_correo: "",
        dir_fiscal: "",
        email: "",
        tlf_cliente: "",
        fax: "",
        razon_social: "",
        tipo_persona: "",
        modalidad_pago: "",
        persona_contacto: "",
        observacion: "",
        cte_decontado: "",
        tipo_persona_new: "",
        flag_activo: "",
        cod_agencia: [],
        cod_agente: [],
        cod_ciudad: [],
        cod_municipio: [],
        cod_parroquia: [],
        cod_localidad: [],
        id: "",
      },
      pais: "",
      estado: "",
      ciudad: "",
      location_input: "",
      agencias: [],
      clientes: [],
      estados: [],
      ciudades: [],
      municipios: [],
      parroquias: [],
      localidades: [],
      conceptos: [],
      agentes: [],
      selected: [],
      selectedAgencia: [],
      tipo_persona: [
        { label: "JURÍDICA", value: "J" },
        { label: "NATURAL", value: "N" },
      ],
      modalidad_pago: [
        { label: "CONTADO", value: "CO" },
        { label: "CREDITO", value: "CR" },
      ],
      estatus: [
        { label: "ACTIVO", value: "1" },
        { label: "INACTIVO", value: "0" },
      ],
      error: "",
      disabledCreate: true,
      disabledEdit: true,
      disabledDelete: true,
      axiosConfig: {
        headers: {
          Authorization: `
          `,
          agencia: "",
          pais: "",
          estado: "",
          municipio: "",
        },
      },
    };
  },
  setup() {
    const $q = useQuasar();
    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 2,
      control: 0,
      rowsPerPage: 4,
      // rowsNumber: xx if getting data from a server
    });
    return {
      pagination: ref({
        rowsPerPage: 4,
      }),
      paginationConceptos: ref({
        rowsPerPage: 4,
      }),
      separator: ref("cell"),
      form: ref(false),
      loading: ref(false),
      formEdit: ref(false),
      clientesDelete: ref(false),
      conceptosBox: ref(false),
      filter: ref(""),
      clienteParticularExistente() {
        $q.notify({
          message: "Solo puede haber un Cliente Particular por Agencia",
          color: "red",
        });
      },
    };
  },
  mounted() {
    this.$refs.methods.getData(
      "/agencias",
      "setDataIniciar",
      "agencias",
      this.axiosConfig
    );
  },
  methods: {
    resetLoading() {
      this.loading = false;
    },
    desactivarCrud(createItem, readItem, deleteItem, updateItem) {
      if (readItem == true) {
        if (createItem == true) {
          this.disabledCreate = false;
        }
        if (deleteItem == true) {
          this.disabledDelete = false;
        }
        if (updateItem == true) {
          this.disabledEdit = false;
        }
      } else this.$router.push("/error403");
    },
    // Reglas
    reglasSelect(val) {
      if (val === null) {
        return "Debes Seleccionar Algo";
      }
      if (val === "") {
        return "Debes Seleccionar Algo";
      }
    },
    reglasInputs(val) {
      if (val === null) {
        return "Debes Seleccionar Algo";
      }
      if (val === "") {
        return "Debes Seleccionar Algo";
      }
    },
    reglasNotNull100(val) {
      if ((val !== null) !== "") {
        if (val.length < 3) {
          return "Deben ser minimo 3 caracteres";
        }
        if (val.length > 99) {
          return "Deben ser Maximo 100 caracteres";
        }
      }
    },
    reglasNotNull20(val) {
      if ((val !== null) !== "") {
        if (val.length < 3) {
          return "Deben ser minimo 3 caracteres";
        }
        if (val.length > 19) {
          return "Deben ser Maximo 19 caracteres";
        }
      }
    },
    reglasNotNull200(val) {
      if ((val !== null) !== "") {
        if (val.length < 3) {
          return "Deben ser minimo 3 caracteres";
        }
        if (val.length > 199) {
          return "Deben ser Maximo 200 caracteres";
        }
      }
    },
    reglasAllowNull20(val) {
      if (val !== null) {
        if (val.length > 0) {
          if (val.length < 3) {
            return "Deben ser minimo 3 caracteres";
          }
          if (val.length > 19) {
            return "Deben ser Maximo 20 caracteres";
          }
        }
      }
    },
    reglasAllowNull100(val) {
      if (val !== null) {
        if (val.length > 0) {
          if (val.length < 3) {
            return "Deben ser minimo 3 caracteres";
          }
          if (val.length > 99) {
            return "Deben ser Maximo 100 caracteres";
          }
        }
      }
    },
    reglasAllowNull65(val) {
      if (val !== null) {
        if (val.length > 0) {
          if (val.length < 3) {
            return "Deben ser minimo 3 caracteres";
          }
          if (val.length > 64) {
            return "Deben ser Maximo 65 caracteres";
          }
        }
      }
    },
    desactivarCrudClientes(createItem, deleteItem, updateItem) {
      if (createItem == true) {
        this.disabledCreate = false;
      }
      if (deleteItem == true) {
        this.disabledDelete = false;
      }
      if (updateItem == true) {
        this.disabledEdit = false;
      }
    },

    getData(url, call, dataRes) {
      this.$refs.methods.getData(url, call, dataRes, this.axiosConfig);
      this.loading = true;
    },
    setDataIniciar(res, dataRes) {
      this[dataRes] = res;
      this.getDataIniciar();
      this.loading = false;
    },
    setDataClientes(res, dataRes) {
      this[dataRes] = res;
      for (var e = 0, len = this.clientes.length; e < len; e++) {
        if (this.clientes[e].cte_decontado === "1") {
          this.clientes[e].cte_decontado = "🏴";
        }
        if (this.clientes[e].cte_decontado === "0") {
          this.clientes[e].cte_decontado = "";
        }
        if (e == this.clientes.length - 1) break;
      }
      this.loading = false;
    },
    setDataEdit(res, dataRes) {
      this.resetFormEdit();
      this[dataRes].id = res.id;
      this[dataRes].descripcion = res.descripcion;
      this[dataRes].nb_cliente = res.nb_cliente;
      this[dataRes].rif_cedula = res.rif_cedula;
      this[dataRes].nit = res.nit;
      this[dataRes].dir_correo = res.dir_correo;
      this[dataRes].dir_fiscal = res.dir_fiscal;
      this[dataRes].tlf_cliente = res.tlf_cliente;
      this[dataRes].fax = res.fax;
      this[dataRes].razon_social = res.razon_social;
      this[dataRes].tipo_persona = res.tipo_desc;
      this[dataRes].modalidad_pago = res.modalidad_desc;
      this[dataRes].persona_contacto = res.persona_contacto;
      this[dataRes].cte_decontado = res.cte_decontado;
      this[dataRes].flag_activo = res.activo_desc;
      this[dataRes].cod_agencia = res.cod_agencia;
      this[dataRes].cod_ciudad = res.cod_ciudad;
      var cod_agente = res.cod_agente;
      var cod_parroquia = res.cod_parroquia;
      var cod_localidad = res.cod_localidad;
      api
        .get(`/municipios/${res.cod_municipio}`, this.axiosConfig)
        .then((res) => {
          this.formEditClientes.cod_municipio = res.data.desc_municipio;
          var cod_municipio = res.data.id;
          var cod_estado = res.data.cod_estado;
          var cod_ciudad = this[dataRes].cod_ciudad;

          this.axiosConfig.headers.estado = cod_estado;
          api.get(`/municipios`, this.axiosConfig).then((res) => {
            this.municipios = res.data;
          });

          this.axiosConfig.headers.municipio = cod_municipio;
          api.get(`/parroquias`, this.axiosConfig).then((res) => {
            this.parroquias = res.data;
          });

          api.get(`/localidades`, this.axiosConfig).then((res) => {
            this.localidades = res.data;
          });

          api.get(`/ciudades`, this.axiosConfig).then((res) => {
            this.ciudades = res.data;
          });

          api.get(`/ciudades/${cod_ciudad}`, this.axiosConfig).then((res) => {
            this.ciudad = res.data.desc_ciudad;
          });

          api.get(`/estados/${cod_estado}`, this.axiosConfig).then((res) => {
            this.estado = res.data.desc_estado;
            this.axiosConfig.headers.pais = res.data.cod_pais;
            api.get(`/estados`, this.axiosConfig).then((res) => {
              this.estados = res.data;
              this.pais = res.data[0].paises.desc_pais;
            });
          });

          api.get(`/agentes/${cod_agente}`, this.axiosConfig).then((res) => {
            this.formEditClientes.cod_agente = res.data.persona_responsable;
          });

          api
            .get(`/parroquias/${cod_parroquia}`, this.axiosConfig)
            .then((res) => {
              this.formEditClientes.cod_parroquia = res.data.desc_parroquia;
            });

          api
            .get(`/localidades/${cod_localidad}`, this.axiosConfig)
            .then((res) => {
              this.formEditClientes.cod_localidad = res.data.desc_localidad;
            });
        });
    },
    deleteData(idpost) {
      this.$refs.methods.deleteData(
        `/clientes/${idpost}`,
        "getData",
        this.axiosConfig
      );
      this.loading = true;
    },
    createDataClientes() {
      this.formClientes.cod_agencia = this.selectedAgencia.id;
      this.formClientes.cod_agente = this.formClientes.cod_agente.id;
      this.formClientes.cod_localidad = this.formClientes.cod_localidad.id;
      this.formClientes.cod_municipio = this.formClientes.cod_municipio.id;
      this.formClientes.cod_parroquia = this.formClientes.cod_parroquia.id;
      this.formClientes.cod_ciudad = this.ciudad.id;
      this.formClientes.modalidad_pago = this.formClientes.modalidad_pago.value;
      this.formClientes.flag_activo = this.formClientes.flag_activo.value;
      if (this.formClientes.cte_decontado === "1") {
        for (var e = 0, len = this.clientes.length; e < len; e++) {
          if (this.clientes[e].cte_decontado === "🏴") {
            this.clienteParticularExistente();
            this.form = false;
            this.resetForm();
            return;
          }
          if (e == this.clientes.length - 1) break;
        }
      }
      this.formClientes.tipo_persona = this.formClientes.tipo_persona.value;
      this.$refs.methods.createData(
        `/clientes`,
        this.formClientes,
        "getData",
        this.axiosConfig
      );
      this.form = false;
      this.loading = true;
    },
    putDataClientes() {
      this.formEditClientes.cod_agencia = this.selectedAgencia.id;
      this.formEditClientes.cod_agente = this.formEditClientes.cod_agente.id;
      this.formEditClientes.cod_localidad =
        this.formEditClientes.cod_localidad.id;
      this.formEditClientes.cod_municipio =
        this.formEditClientes.cod_municipio.id;
      this.formEditClientes.cod_parroquia =
        this.formEditClientes.cod_parroquia.id;
      this.formEditClientes.cod_ciudad = this.ciudad.id;
      this.formEditClientes.modalidad_pago =
        this.formEditClientes.modalidad_pago.value;
      this.formEditClientes.flag_activo =
        this.formEditClientes.flag_activo.value;
      if (this.formEditClientes.cte_decontado === "1") {
        for (var e = 0, len = this.clientes.length; e < len; e++) {
          if (this.clientes[e].cte_decontado === "🏴") {
            if (this.formEditClientes.id !== this.clientes[e].id) {
              this.clienteParticularExistente();
              this.formEdit = false;
              this.resetFormEdit();
              return;
            }
          }
          if (e == this.clientes.length - 1) break;
        }
      }
      this.formEditClientes.tipo_persona =
        this.formEditClientes.tipo_persona.value;
      this.$refs.methods.putData(
        `/clientes/${this.formEditClientes.id}`,
        this.formEditClientes,
        "getData",
        this.axiosConfig
      );
      this.formEdit = false;
      this.loading = true;
    },
    resetFormEdit() {
      (this.formEditClientes.nb_cliente = ""),
        (this.formEditClientes.rif_cedula = ""),
        (this.formEditClientes.nit = ""),
        (this.formEditClientes.dir_correo = ""),
        (this.formEditClientes.dir_fiscal = ""),
        (this.formEditClientes.email = ""),
        (this.formEditClientes.tlf_cliente = ""),
        (this.formEditClientes.fax = ""),
        (this.formEditClientes.razon_social = ""),
        (this.formEditClientes.tipo_persona = ""),
        (this.formEditClientes.modalidad_pago = ""),
        (this.formEditClientes.persona_contacto = ""),
        (this.formEditClientes.observacion = ""),
        (this.formEditClientes.cte_decontado = ""),
        (this.formEditClientes.tipo_persona_new = ""),
        (this.formEditClientes.flag_activo = ""),
        (this.formEditClientes.cod_agencia = ""),
        (this.formEditClientes.cod_agente = ""),
        (this.formEditClientes.cod_municipio = ""),
        (this.formEditClientes.cod_parroquia = ""),
        (this.formEditClientes.cod_localidad = ""),
        (this.pais = ""),
        (this.estado = ""),
        (this.ciudad = "");
    },
    resetForm() {
      (this.formClientes.nb_cliente = ""),
        (this.formClientes.rif_cedula = ""),
        (this.formClientes.nit = ""),
        (this.formClientes.dir_correo = ""),
        (this.formClientes.dir_fiscal = ""),
        (this.formClientes.email = ""),
        (this.formClientes.tlf_cliente = ""),
        (this.formClientes.fax = ""),
        (this.formClientes.razon_social = ""),
        (this.formClientes.tipo_persona = ""),
        (this.formClientes.modalidad_pago = ""),
        (this.formClientes.persona_contacto = ""),
        (this.formClientes.observacion = ""),
        (this.formClientes.cte_decontado = ""),
        (this.formClientes.tipo_persona_new = ""),
        (this.formClientes.flag_activo = ""),
        (this.formClientes.cod_agencia = ""),
        (this.formClientes.cod_agente = ""),
        (this.formClientes.cod_municipio = ""),
        (this.formClientes.cod_parroquia = ""),
        (this.formClientes.cod_localidad = ""),
        (this.formClientes.cte_decontado = "0"),
        (this.pais = ""),
        (this.estado = ""),
        (this.ciudad = "");
    },
    // Metodos para colocar valores iniciales
    getDataIniciar() {
      this.agenciaRef = this.agencias[0].id;
      this.selectedAgencia = this.agencias[0];
      this.$refs.methods.getData(
        `/paises`,
        `setDataPaises`,
        `paises`,
        this.axiosConfig
      );
      this.axiosConfig.headers.agencia = this.agenciaRef;
      this.$refs.methods.getData(
        `/clientes`,
        "setDataClientes",
        `clientes`,
        this.axiosConfig
      );
      this.$refs.methods.getData(
        `/agentes`,
        `setDataAgentes`,
        `agentes`,
        this.axiosConfig
      );
    },

    getDataLocalidades(sub_location, update) {
      this.$refs.methods.getData(
        `/${sub_location}`,
        `${update}`,
        `${sub_location}`,
        this.axiosConfig
      );
    },
    setDataAgentes(res, dataRes) {
      this[dataRes] = res;
    },
    setDataPaises(res, dataRes) {
      this[dataRes] = res;
    },
    setDataCiudades(res, dataRes) {
      this[dataRes] = res;
      this.ciudad = "";
      this.formEditClientes.cod_localidad = "";
      this.formClientes.cod_localidad = "";
    },
    setDataEstados(res, dataRes) {
      this[dataRes] = res;
      this.estado = "";
      this.ciudad = "";
      this.localidades = [];
      this.municipios = [];
      this.parroquias = [];
      this.ciudades = [];
      this.formEditClientes.cod_localidad = "";
      this.formEditClientes.cod_municipio = "";
      this.formEditClientes.cod_parroquia = "";
      this.formClientes.cod_localidad = "";
      this.formClientes.cod_municipio = "";
      this.formClientes.cod_parroquia = "";
    },
    setDataMunicipios(res, dataRes) {
      this[dataRes] = res;
      this.formEditClientes.cod_parroquia = "";
      this.formEditClientes.cod_municipio = "";
      this.formClientes.cod_parroquia = "";
      this.formClientes.cod_municipio = "";
    },
    setDataParroquias(res, dataRes) {
      this[dataRes] = res;
      this.formEditClientes.cod_parroquia = "";
      this.formClientes.cod_parroquia = "";
    },
    setDataLocalidades(res, dataRes) {
      this[dataRes] = res;
    },
  },
};
</script>

<style>
@media screen and (min-width: 600px) {
  .q-field--auto-height.q-field--labeled .q-field__native {
    min-width: 120px;
  }
}
@media screen and (max-width: 600px) {
  .q-field--auto-height.q-field--labeled .q-field__native {
    min-width: 100px;
    max-width: 150px;
  }
}
.menuFilter {
  padding-bottom: 1px;
}
.menuFilter2 {
  padding-bottom: 3px;
  padding-top: 1px;
}
@media screen and (min-width: 1024px) {
  .cardMenu {
    margin-right: 20px;
    margin-bottom: 20px;
  }
}
@media screen and (min-width: 600px) {
  .filterHeader {
    margin-left: 30px;
  }
}
@media screen and (max-width: 1024px) {
  .botonesGuias {
    margin-top: 30px;
  }
}
@media screen and (max-width: 600px) {
  .botonesGuias {
    padding-right: 10px;
  }
}
@media screen and (min-width: 600px) {
  .selectmovil {
    margin-right: 15px;
  }
}
@media screen and (min-width: 600px) {
  .btnCard {
    margin-right: 25px;
    align-self: center;
    text-align: center;
  }
}
@media screen and (max-width: 600px) {
  .btnCard {
    margin-left: 25px;
  }
}
@media screen and (max-width: 1024px) {
  .espaciadoGuias {
    margin-top: 20px;
  }
}
@media screen and (max-width: 1024px) {
  .card {
    margin-bottom: 20px;
  }
}
@media screen and (max-width: 600px) {
  .checkboxTitle {
    margin-top: 20px;
  }
}
@media screen and (max-width: 1024px) {
  .SelectAgenciaCliente {
    margin-bottom: 10px;
    margin-top: 10px;
  }
}
@media screen {
  .inputMovil {
    margin-bottom: 21px;
  }
}
@media screen and (min-width: 1024px) {
  .inputMovilBtn {
    margin-bottom: 21px;
  }
}
@media screen and (max-width: 1024px) {
  .inputMovilBtn {
    margin-bottom: 21px;
    margin-left: 15px;
  }
}
</style>

<style lang="sass">
.my-sticky-header-column-table
  /* height or max-height is important */

  /* specifying max-width so the example can
    highlight the sticky column on any browser window */

  td:first-child
    /* bg color is important for td; just specify one */
    background-color: #ffffff !important

  tr th
    position: sticky
    /* higher than z-index for td below */
    z-index: 2
    /* bg color is important; just specify one */
    background: #fff

  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
    /* highest z-index */
    z-index: 3
  thead tr:first-child th
    top: 0
    z-index: 1
  tr:first-child th:first-child
    /* highest z-index */
    z-index: 3

  td:first-child
    z-index: 1

  td:first-child, th:first-child
    position: sticky
    left: 0
</style>
