<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Login</div>

                    <div class="card-body">
                        <form v-on:submit.prevent="login()">
                            <div class="form-group row">
                                <label for="email" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>

                                <div class="col-md-6">
                                    <input id="email" type="email" class="form-control" :class="{'is-invalid': errors.hasOwnProperty('email')}" name="email" v-model="form.email" required autocomplete="email" autofocus>

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
                                    <input id="password" type="password" class="form-control" :class="{'is-invalid': errors.hasOwnProperty('password')}" name="password" v-model="form.password" required autocomplete="current-password">

                                    <div class="invalid-feedback" v-if="errors.hasOwnProperty('password')">
                                        <strong>
                                            {{ errors.password[0] }}
                                        </strong>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-md-6 offset-md-4">
                                    <div class="form-check">
                                        <input id="remember" type="checkbox" class="form-check-input" name="remember" v-model="form.remember">

                                        <label class="form-check-label" for="remember">
                                            Remember Me
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row mb-0">
                                <div class="col-md-8 offset-md-4">
                                    <button type="submit" class="btn btn-primary">
                                        Login
                                    </button>

                                    <a class="btn btn-link" href="">
                                        Forgot Your Password?
                                    </a>
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
    name: "Login",
    data: () => ({
        form: {
            email: '',
            password: '',
            remember: false
        },
        errors: {}
    }),
    methods: {
        login() {
            this.$auth.login({
                data: this.form,
                rememberMe: this.form.remember,
                success: () => {},
                error: error => {
                    this.errors = error.response.data.errors;
                }
            });
        }
    }
}
</script>
