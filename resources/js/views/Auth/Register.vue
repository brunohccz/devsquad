<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Register</div>

                    <div class="card-body">
                        <form v-on:submit.prevent="register()">
                            <div class="form-group row">
                                <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>

                                <div class="col-md-6">
                                    <input id="name" type="text" class="form-control" :class="{'is-invalid': errors.hasOwnProperty('name')}" name="name" v-model="form.name" required autocomplete="name" autofocus>

                                    <div class="invalid-feedback" v-if="errors.hasOwnProperty('name')">
                                        <strong>
                                            {{ errors.name[0] }}
                                        </strong>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="email" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>

                                <div class="col-md-6">
                                    <input id="email" type="email" class="form-control" :class="{'is-invalid': errors.hasOwnProperty('email')}" name="email" v-model="form.email" required autocomplete="email">

                                    <div class="invalid-feedback" v-if="errors.hasOwnProperty('email')">
                                        <strong>
                                            {{ errors.email[0] }}
                                        </strong>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                                <div class="col-md-6">
                                    <input id="password" type="password" class="form-control" :class="{'is-invalid': errors.hasOwnProperty('password')}" name="password" v-model="form.password" required autocomplete="new-password">

                                    <div class="invalid-feedback" v-if="errors.hasOwnProperty('password')">
                                        <strong>
                                            {{ errors.password[0] }}
                                        </strong>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="password-confirm" class="col-md-4 col-form-label text-md-right">Confirm Password</label>

                                <div class="col-md-6">
                                    <input id="password-confirm" type="password" class="form-control" name="password_confirmation" v-model="form.password_confirmation" required autocomplete="new-password">
                                </div>
                            </div>

                            <div class="form-group row mb-0">
                                <div class="col-md-6 offset-md-4">
                                    <button type="submit" class="btn btn-primary">
                                        Register
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Register",
    data: () => ({
        form: {
            name: '',
            email: '',
            password: '',
            password_confirmation: ''
        },
        errors: {}
    }),
    methods: {
        register() {
            this.$auth.register({
                data: this.form,
                success: () => {},
                error: error => {
                    this.errors = error.response.data.errors;
                }
            });
        }
    }
}
</script>
