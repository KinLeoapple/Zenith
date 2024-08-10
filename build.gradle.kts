import org.jetbrains.dokka.DokkaConfiguration.Visibility
import org.jetbrains.dokka.gradle.DokkaTask

val ktorVersion: String by project
val kotlinVersion: String by project
val logbackVersion: String by project
val exposedVersion: String by project

plugins {
    kotlin("jvm") version "1.9.23"
    id("io.ktor.plugin") version "2.3.10"
    id("org.jetbrains.dokka") version "1.9.20"
}

subprojects {
    apply(plugin = "org.jetbrains.dokka")
}

tasks.dokkaHtml {
    outputDirectory.set(layout.buildDirectory.dir("documentation/html"))
}

tasks.dokkaGfm {
    outputDirectory.set(layout.buildDirectory.dir("documentation/markdown"))
}

tasks.withType<DokkaTask>().configureEach {
    dokkaSourceSets.configureEach {
        documentedVisibilities.set(
            setOf(
                Visibility.PUBLIC,
                Visibility.PROTECTED,
            )
        )

        perPackageOption {
            matchingRegex.set(".*internal.*")
            suppress.set(true)
        }
    }
}

group = "moe.zenith"
version = "0.0.1"

application {
    mainClass.set("moe.zenith.ApplicationKt")

    val isDevelopment: Boolean = project.ext.has("development")
    applicationDefaultJvmArgs = listOf("-Dio.ktor.development=$isDevelopment")
}

repositories {
    mavenCentral()
    maven("https://maven.aliyun.com/repository/public")
    maven("https://maven.aliyun.com/repository/google")
}

dependencies {
    implementation("io.ktor:ktor-server-core-jvm")
    implementation("io.ktor:ktor-server-content-negotiation-jvm")
    implementation("io.ktor:ktor-serialization-gson-jvm")
    implementation("io.ktor:ktor-server-cors-jvm")
    implementation("io.ktor:ktor-server-netty-jvm")

    implementation("ch.qos.logback:logback-classic:$logbackVersion")
    implementation("org.jetbrains.exposed:exposed-core:$exposedVersion")
    implementation("org.jetbrains.exposed:exposed-dao:$exposedVersion")
    implementation("org.jetbrains.exposed:exposed-jdbc:$exposedVersion")
    implementation("org.jetbrains.exposed:exposed-kotlin-datetime:$exposedVersion")
    implementation("org.postgresql:postgresql:42.7.2")
    implementation("com.zaxxer:HikariCP:5.1.0")

    implementation("io.ktor:ktor-server-config-yaml")

    implementation("com.auth0:java-jwt:4.4.0")
    implementation("io.ktor:ktor-server-auth:$ktorVersion")
    implementation("io.ktor:ktor-server-auth-jwt:$ktorVersion")

    implementation("io.ktor:ktor-server-sessions:$ktorVersion")

    implementation("io.ktor:ktor-server-default-headers:$ktorVersion")

    implementation("cn.hutool:hutool-all:5.8.28")
    implementation("com.github.yitter:yitter-idgenerator:1.0.6")

    testImplementation("io.ktor:ktor-server-tests-jvm")
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit:$kotlinVersion")

    implementation("io.github.smiley4:ktor-swagger-ui:2.9.0")
}
